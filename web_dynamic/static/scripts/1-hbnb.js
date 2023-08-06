$(document).ready(function() {
  const amenities = {};

  function updateAmenities() {
    const amenitiesList = object.values(amenities).map(amenity => amenity.name);
    const amenitiesText = amenitiesList.join(', ');

    $('#api_status').removeClass('available');
    $('div.amenities h4').html(amenitiesText);
  }

  $('li input[type="checkbox"]').change(function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = { id: amenityId, name: amenityName };
    } else {
      delete amenities[amenityId];
    }

    updateAmenities();

  });
});
