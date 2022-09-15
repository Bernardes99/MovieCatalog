from django.db import models
from multiselectfield import MultiSelectField
from django.core.validators import MaxValueValidator, MinValueValidator
import datetime

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

# Create your models here.
class Movie(models.Model):
    
    title = models.CharField(max_length=250)
    year = models.IntegerField(default=datetime.datetime.now().year, validators=[MinValueValidator(1950), MaxValueValidator(datetime.date.today().year)])
    description = models.TextField()
    rating = models.FloatField(default=0.0, validators=[MinValueValidator(0), MaxValueValidator(10)])
    trailer_url = models.CharField(max_length=1000, default="")
    image_url = models.CharField(max_length=1000, default="")
    directors = models.CharField(max_length=1000, default="")
    cast = models.CharField(max_length=1000, default="")
    language = models.CharField(max_length=200, default="")
    runtime = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(500)])
    genres = MultiSelectField(choices=genre_choices, max_choices=3)

    




    
