from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.BookListView.as_view(), name='book-list'),
    path('books/<int:pk>/', views.BookDetailView.as_view(), name='book-detail'),
    path('search/', views.BookSearchView.as_view(), name='book-search'),
    path('api/favorite-books/', views.FavoriteBookCreateView.as_view(), name='favorite-book-create'),
    path('api/favorite-books/<int:pk>/', views.FavoriteBookDeleteView.as_view(), name='favorite-book-delete'),
]

