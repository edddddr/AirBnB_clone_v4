$(document).ready(function() {
  const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
  
  function createPlaceCard(place) {
    const article = $('<article>');
    const title =  $('<h2>').text(place.name);
    const price = $('<div').addClass('price_by_night').text('$' + place.price_by_night);
    const info = $('<div').addClass('information');
    const maxGuests = $('<div').addClass('max_guest').html('<i class="fa fa-users fa-3x"
                                                           aria-hidden="true"></i><br>' +
                                                           place.max_guest + 'Guests');
    const numberRooms = $('<div').addClass('number_rooms').html('<i class="fa fa-users fa-3x"
                                                                aria-hidden="true"></i><br>' +
                                                                place.number_rooms + 'Bedrooms');
    const numberBathrooms = $('<div').addClass('number_bathrooms').html('<i class="fa fa-users fa-3x"
                                                                        aria-hidden="true"></i><br>'
                                                                        + place.number_bathrooms +
                                                                        'Bathrooms');
    const description = $('<div').addClass('description').text(place.description);

    info.append(maxGuests, numberRooms, numberBathrooms);
    article.append(title, price, info, description);

    return article;
  }

  function updatePlaces() {
   $.ajax({
      url: apiUrl,
      type: 'POST',
      contentType: 'application/json';
      data: JSON.stringify({ amenities: Object.keys(amenities) })
   }).done(function(data) {
      const placesSection = $('section.places');
      placesSection.empty();

      data.forEach(function(place) {
        const placeCard = createPlaceCard(place);
        placeSection.append(placeCard);
      });
   });
 }

   function handleFilterClick() {
     const checkbox = $(this);
     const amenityId = checkbox.data('Id');
     const amenityName = checkbox.data('Name');

     if (checkbox.is(':checked')) {
         amenities[amenityId] = amenityName;
     } else {
         delete amenities[amenityId];
     }

     updatePlaces();
   }
   $('input[type="checkbox"]').change(handleFilterClick);
});
});
