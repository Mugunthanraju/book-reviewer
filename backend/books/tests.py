# from django.test import TestCase

# Create your tests here.
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Book, FavoriteBook
from .serializers import BookSerializer, FavoriteBookSerializer

class BookAPITestCase(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Create some test books
        self.book1 = Book.objects.create(title='Book 1', author='Author 1', genre='Fiction', description='Description 1')
        self.book2 = Book.objects.create(title='Book 2', author='Author 2', genre='Non-fiction', description='Description 2')

    def test_book_list(self):
        # Test listing all books
        response = self.client.get('/api/books/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Check if all books are returned

    def test_book_detail(self):
        # Test retrieving book details
        response = self.client.get(f'/api/books/{self.book1.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Book 1')

    def test_book_creation(self):
        # Test creating a new book
        self.client.force_authenticate(user=self.user)
        data = {'title': 'New Book', 'author': 'New Author', 'genre': 'Science Fiction', 'description': 'New Description'}
        response = self.client.post('/api/books/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), 3)

    def test_favorite_book_creation(self):
        # Test adding a book to favorites
        self.client.force_authenticate(user=self.user)
        data = {'book': self.book1.id}
        response = self.client.post('/api/favorite-books/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(FavoriteBook.objects.filter(user=self.user, book=self.book1).exists())

    def test_favorite_book_deletion(self):
        # Test removing a book from favorites
        self.client.force_authenticate(user=self.user)
        favorite = FavoriteBook.objects.create(user=self.user, book=self.book1)
        response = self.client.delete(f'/api/favorite-books/{favorite.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(FavoriteBook.objects.filter(user=self.user, book=self.book1).exists())

