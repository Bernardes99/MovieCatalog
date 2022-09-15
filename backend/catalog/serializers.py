from rest_framework import fields, serializers
from .models import Movie

genre_choices = [
    ('Action', 'Action'),
    ('Adventure', 'Adventure'),
    ('Animation', 'Animation'),
    ('Comedy', 'Comedy'),
    ('Crime', 'Crime'),
    ('Drama', 'Drama'),
    ('Fantasy', 'Fantasy'),
    ('Fiction', 'Fiction'),
    ('History', 'History'),
    ('Horror', 'Horror'),
    ('Mystery', 'Mystery'),
    ('Musical', 'Musical'),
    ('Romance', 'Romance'),
    ('Sci-Fi', 'Sci-Fi'),
    ('Thriller', 'Thriller'),
    ('Western', 'Western'),
]

class MovieSerializer(serializers.ModelSerializer):
    genres = fields.MultipleChoiceField(choices=genre_choices)
    class Meta:
        model = Movie
        fields = ('id', 'title', 'year', 'description', 'rating', 'trailer_url', 'image_url', 'directors', 'cast', 'language','runtime', 'genres')

        