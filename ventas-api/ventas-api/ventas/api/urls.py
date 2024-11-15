from django.urls import path
from .views import ClienteListCreate, ClienteRetrieveUpdateDestroy, ComercialListCreate, ComercialRetrieveUpdateDestroy, PedidoListCreate, PedidoRetrieveUpdateDestroy, ComercialLogin, get_comercial_id, EmailAPIView

urlpatterns = [
    path('clientes/', ClienteListCreate.as_view(), name='cliente-list-create'),
    path('clientes/<int:pk>/', ClienteRetrieveUpdateDestroy.as_view(), name='cliente-detail'),
    path('comerciales/', ComercialListCreate.as_view(), name='comercial-list-create'),
    path('comerciales/<int:pk>/', ComercialRetrieveUpdateDestroy.as_view(), name='comercial-detail'),
    path('pedidos/', PedidoListCreate.as_view(), name='pedido-list-create'),
    path('pedidos/<int:pk>/', PedidoRetrieveUpdateDestroy.as_view(), name='pedido-detail'),
    path('comercial/login/', ComercialLogin.as_view(), name='comercial-login'),
    path('get_comercial_id/', get_comercial_id, name='get_comercial_id'),
    path('send-email/', EmailAPIView.as_view(), name= 'send-email')
]
