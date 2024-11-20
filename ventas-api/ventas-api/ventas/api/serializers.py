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
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

