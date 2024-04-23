from rest_framework import generics, filters, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.db.models import Avg
from .models import Book, FavoriteBook
from .serializers import BookSerializer, FavoriteBookSerializer

class BookPagination(PageNumberPagination):
    page_size = 10  # Set the default page size

class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = BookPagination  # Set the pagination class
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        sort_by = self.request.query_params.get('sort_by', 'title')  # Default sort by title

        # Handle sorting by average rating
        if sort_by == 'average_rating':
            queryset = queryset.annotate(avg_rating=Avg('reviews__rating')).order_by('-avg_rating')
        else:
            queryset = queryset.order_by(sort_by)

        return queryset

class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

class BookSearchView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'author', 'genre']
    ordering_fields = ['title', 'author', 'reviews__rating']  # Specify fields for sorting
    permission_classes = [permissions.IsAuthenticated]

class FavoriteBookCreateView(generics.CreateAPIView):
    queryset = FavoriteBook.objects.all()
    serializer_class = FavoriteBookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FavoriteBookDeleteView(generics.DestroyAPIView):
    queryset = FavoriteBook.objects.all()
    serializer_class = FavoriteBookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        book_id = self.kwargs['pk']
        return FavoriteBook.objects.get(user=self.request.user, book_id=book_id)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
