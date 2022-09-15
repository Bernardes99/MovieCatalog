from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MovieSerializer
from .models import Movie
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class MovieView(viewsets.ModelViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    filterset_fields = ['year', 'genres']
    ordering_fields = ['title', 'year', 'rating']