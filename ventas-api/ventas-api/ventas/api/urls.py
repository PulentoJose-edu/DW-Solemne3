from django.urls import path
from .views import ClienteListCreate, ClienteRetrieveUpdateDestroy, ProductoRetrieveUpdateDestroy , ComercialListCreate, ComercialRetrieveUpdateDestroy, PedidoListCreate, PedidoRetrieveUpdateDestroy, ComercialLogin, ProductosMasVendidosAPIView, get_comercial_id, EmailAPIView, ProductoListCreate, PedidoProductoListCreate, PedidoProductoRetrieveUpdateDestroy, PedidoListCreate

urlpatterns = [
    path('clientes/', ClienteListCreate.as_view(), name='cliente-list-create'),
    path('clientes/<int:pk>/', ClienteRetrieveUpdateDestroy.as_view(), name='cliente-detail'),
    path('comerciales/', ComercialListCreate.as_view(), name='comercial-list-create'),
    path('comerciales/<int:pk>/', ComercialRetrieveUpdateDestroy.as_view(), name='comercial-detail'),
    path('pedidos/', PedidoListCreate.as_view(), name='pedido-list-create'),
    path('pedidos/<int:pk>/', PedidoRetrieveUpdateDestroy.as_view(), name='pedido-detail'),
    path('comercial/login/', ComercialLogin.as_view(), name='comercial-login'),
    path('get_comercial_id/', get_comercial_id, name='get-comercial-id'),
    path('send-email/', EmailAPIView.as_view(), name= 'send-email'),
    path('productos/', ProductoListCreate.as_view(), name='producto-list-create'),
    path('productos/<int:pk>/', ProductoRetrieveUpdateDestroy.as_view(), name='producto-detail'),
    path('pedido-productos/', PedidoProductoListCreate.as_view(), name= 'pedido-producto-list-create' ),
    path('pedido-productos/<int:pk>/', PedidoProductoRetrieveUpdateDestroy.as_view(), name= 'pedido-producto-detail' ),
    path('productos-mas-vendidos/', ProductosMasVendidosAPIView.as_view(), name='productos-mas-vendidos'),
]
