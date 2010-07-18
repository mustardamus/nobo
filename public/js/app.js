$(document).ready(function() {
  $.post('/say?word=really', function(data) {
    var p     = $('p'),
        ptext = p.text();
    
    p.text(ptext.replace('great', 'really great'));
  });
});