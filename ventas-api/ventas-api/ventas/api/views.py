from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum
from django.contrib.auth.hashers import check_password
from .models import Cliente, Comercial, Pedido, Producto, PedidoProducto
from .serializers import ClienteSerializer, ComercialSerializer, PedidoSerializer, PedidoProductoSerializer, ProductoSerializer, ProductoMasVendidoSerializer
from django.http import JsonResponse
import json
from django.core.mail import send_mail

class ClienteListCreate(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ClienteRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ComercialListCreate(generics.ListCreateAPIView):
    queryset = Comercial.objects.all()
    serializer_class = ComercialSerializer

class ComercialRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comercial.objects.all()
    serializer_class = ComercialSerializer
class ProductoListCreate(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    
class PedidoProductoListCreate(generics.ListCreateAPIView):
    queryset = PedidoProducto.objects.all()
    serializer_class = PedidoProductoSerializer

class PedidoProductoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = PedidoProducto.objects.all()
    serializer_class = PedidoProductoSerializer

class PedidoListCreate(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class PedidoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

    

class ComercialLogin(APIView):
    def post(self, request):
        nombre = request.data.get('nombre')
        password = request.data.get('password')

        # Verifica que se proporcionen ambos campos
        if not nombre or not password:
            return Response({"error": "Nombre y contraseña son requeridos"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Busca el comercial por el nombre
            comercial = Comercial.objects.get(nombre=nombre)
            print(comercial)
            
            # Verifica la contraseña
            if comercial.check_password(password):
                return Response({"success": "Autenticación exitosa"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)
        
        except Comercial.DoesNotExist:
            return Response({"error": "El comercial no existe"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def get_comercial_id(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nombre = data.get('nombre')
            password = data.get('password')
            
            # Busca el Comercial por nombre
            comercial = Comercial.objects.get(nombre=nombre)
            
            # Verifica la contraseña
            if comercial.check_password(password):
                return JsonResponse({'id': comercial.id}, status=200)
            else:
                return JsonResponse({'error': 'Contraseña incorrecta'}, status=400)
        except Comercial.DoesNotExist:
            return JsonResponse({'error': 'Comercial no encontrado'}, status=404)
        except KeyError:
            return JsonResponse({'error': 'Nombre y contraseña son requeridos'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

class EmailAPIView(APIView):
    def post(self, request):
        try:
            print("Datos recibidos:", request.data)
            cliente = Cliente.objects.get(id=request.data.get('cliente'))
            comercial = Comercial.objects.get(id=request.data.get('comercial'))
            to_email = request.data.get('correoElectronico')
            subject = "Pedido de compra"
            message = (
                f"Este es un resumen de compra\n"
                f"Nombre: {cliente.nombre}\n"
                f"Comercial: {comercial.nombre}\n"
                f"Fecha: {request.data.get('fecha')}\n"
                f"Total: {request.data.get('total')}\n"
            )
            
            send_mail(subject, message, None, [to_email])
            return Response({'message': 'Correo Enviado con Exito'}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = str(e)
            return Response({'message': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
def obtener_productos_mas_vendidos():
    productos_mas_vendidos = Producto.objects.annotate(
        total_vendido=Sum('pedidoproducto__cantidad')  # Sumar todas las cantidades asociadas al producto
    ).order_by('-total_vendido')[:10]  # Limitar a los 10 más vendidos
    return productos_mas_vendidos

class ProductosMasVendidosAPIView(APIView):
    def get(self, request, *args, **kwargs):
        productos_mas_vendidos = obtener_productos_mas_vendidos()
        serializer = ProductoMasVendidoSerializer(productos_mas_vendidos, many=True)
        return Response(serializer.data)
    

class ValidadPedido(APIView):
    def post(self, request):
        producto = request.data.get('producto')
        cantidad = request.data.get('cantidad')
        total = 0
        try:
            producto = Producto.objects.get(id=producto)
            if producto.cantidad_disponible > cantidad:
                total += producto.precio * cantidad
                return Response({'total': total}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No hay suficiente stock'}, status=status.HTTP_204_NO_CONTENT)
        except Producto.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)