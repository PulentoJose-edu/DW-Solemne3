from rest_framework import serializers
from .models import Cliente, Comercial, Pedido, Producto, PedidoProducto

#To convert your models into JSON for the API

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class ComercialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comercial
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class PedidoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoProducto
        fields = ['producto', 'cantidad','pedido']
class PedidoSerializer(serializers.ModelSerializer):
    detalles = PedidoProductoSerializer(many=True, write_only=True)  # Para recibir datos anidados
    productos = ProductoSerializer(many=True, read_only=True)  # Solo lectura para incluir los productos en la respuesta

    class Meta:
        model = Pedido
        fields = ['id', 'productos', 'detalles', 'total', 'fecha', 'cliente', 'comercial']

    def create(self, validated_data):
        # Extraemos los detalles del pedido
        detalles_data = validated_data.pop('detalles')
        pedido = Pedido.objects.create(**validated_data)

        # Crear los detalles del pedido y actualizar la cantidad disponible de productos
        for detalle_data in detalles_data:
            producto = Producto.objects.get(id=detalle_data['producto'].id)
            if producto.cantidad_disponible < detalle_data['cantidad']:
                raise serializers.ValidationError(f"No hay suficiente stock para el producto {producto.nombre}.")
            
            PedidoProducto.objects.create(
                pedido=pedido,
                producto=producto,
                cantidad=detalle_data['cantidad']
            )
            # Actualizar el stock del producto
            producto.restarCantidad(detalle_data['cantidad'])
        
        # Calcular el total del pedido
        pedido.calcular_total()
        return pedido 
class ProductoMasVendidoSerializer(serializers.ModelSerializer):
    total_vendido = serializers.IntegerField()  # Campo calculado

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'total_vendido']