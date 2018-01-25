function editmode(){
    console.log('Edit mode activated');
    var ps = document.getElementsByClassName('pm');
    var es = document.getElementsByClassName('em');
    for( var i=0, node; node = ps.item(i); i++ ) node.style['display']='none';
    for( var i=0, node; node = es.item(i); i++ ) node.style['display']='block';
};

function profilemode(){
    var ps = document.getElementsByClassName('pm');
    var es = document.getElementsByClassName('em');
    for( var i=0, node; node = ps.item(i); i++ ) node.style['display']='block';
    for( var i=0, node; node = es.item(i); i++ ) node.style['display']='none';
};

// function show_calendar(a){
//     console.log(a)
//     a.datepicker()
// };

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function apply_calendar(){
  $( ".show-calendar" ).datepicker({ dateFormat: 'dd-mm-yy'});
}

function apply_masks(){

  $('.id-field').mask(
    'xxxxxxxxxxxx',
    // 'xxxx-xxx-xx-xxx',
      {
        translation: { 'x' : { pattern: /[0-9a-f]/} },
        placeholder: '456789abcdef'
      }
    );


  $('.money-field').mask(
    '0#',
    // '$#.##0,00',
    {
      // reverse: true,
      placeholder: '$3'
    })

  d = $('.date-field');

  d.mask('00-00-0000', {
    placeholder: "__-__-____"
  });


  var elems_str = '.phone-field';

  //
  // Unfortunately, it doesn't work with AngularJS: overwrites onKeyPress of angular (a guess)
  //
  // options = {

  //   onKeyPress: function(cep, e, field, options){
  //     var masks = ['+099-999-999-9999', '8-999-999-9999']
  //     // var mask = ( cep.startsWith('8') || cep.length == 0) ? masks[1] : masks[0];
  //     var mask = ( cep.startsWith('8') ) ? masks[1] : masks[0];
  //     $(elems_str).mask(mask, options);
  //   },

  //   selectOnFocus: true

  //   // translation: {
  //   //   '+': {
  //   //     pattern: /\+/,
  //   //     optional: true
  //   //   }
  //   // }
  // }
  // $(elems_str).mask('0', options)

  $(elems_str).mask('+099-999-999-9999')

}

align_center = function(strings){
    var max = 0;
    var result = []
    for( i in strings )
        if( strings[i].length > max) max = strings[i].length;
    for( i in strings )
        result.push( '  '.repeat((max - strings[i].length)/2) + strings[i] )
    return result.join('\n');
}