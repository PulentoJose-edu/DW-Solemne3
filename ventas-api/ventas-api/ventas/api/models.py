from django.db import models
import bcrypt

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    apellido1 = models.CharField(max_length=100)
    apellido2 = models.CharField(max_length=100, null=True, blank=True)
    nickname = models.CharField(max_length=100, null=True, blank=True)
    ciudad = models.CharField(max_length=100, null=True, blank=True)
    categoria = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido1}"

class Comercial(models.Model):
    nombre = models.CharField(max_length=100)
    apellido1 = models.CharField(max_length=100)
    apellido2 = models.CharField(max_length=100, null=True, blank=True)
    comision = models.FloatField()
    password = models.CharField(max_length=255)  # Campo para almacenar la contraseña encriptada

    def __str__(self):
        return f"{self.nombre} {self.apellido1}"

    def save(self, *args, **kwargs):
        # Verifica si la contraseña es nueva o ha cambiado
        if self._state.adding or 'password' in self.get_dirty_fields():
            salt = bcrypt.gensalt()
            self.password = bcrypt.hashpw(self.password.encode('utf-8'), salt).decode('utf-8')
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        # Verifica la contraseña
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.password.encode('utf-8'))

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.FloatField()
    cantidad_disponible = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.nombre}"
    
    def restarCantidad(self, cantidad):
        self.cantidad_disponible -= cantidad
        self.save()


class PedidoProducto(models.Model):
    pedido = models.ForeignKey('Pedido', on_delete=models.CASCADE)
    producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()

class Pedido(models.Model):
    productos = models.ManyToManyField(Producto, through='PedidoProducto')
    total = models.FloatField(default=0)
    fecha = models.DateField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.id}"
    
    def calcular_total(self):
        self.total = sum(
            [pp.producto.precio * pp.cantidad for pp in self.pedidoproducto_set.all()]
        )
        self.save()
