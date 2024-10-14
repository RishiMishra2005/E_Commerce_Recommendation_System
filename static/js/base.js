  // Handle click on Settings link to open the modal
  document.getElementById('settingsLink').addEventListener('click', function() {
    $('#settingsModal').modal('show');
  });

  // Handle theme apply button click
  document.getElementById('applyTheme').addEventListener('click', function() {
    // Get the selected theme value
    var selectedTheme = document.querySelector('input[name="theme"]:checked').value;

    // Apply the selected theme
    if (selectedTheme === 'black') {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else if (selectedTheme === 'green') {
      document.body.style.backgroundColor = 'green';
      document.body.style.color = 'white';
    } else {
      // Default theme
      document.body.style.backgroundColor = '#f8f9fa';
      document.body.style.color = 'black';
    }

    // Close the modal
    $('#settingsModal').modal('hide');
  });

  // Handle zoom in button click
  document.getElementById('zoomIn').addEventListener('click', function() {
    document.body.style.zoom = "115%";
  });

  // Handle zoom out button click
  document.getElementById('zoomOut').addEventListener('click', function() {
    document.body.style.zoom = "100%";
  });