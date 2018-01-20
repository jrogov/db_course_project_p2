function editmode(){
    console.log('Edit mode activated');
    var ps = document.getElementsByClassName('pm');
    var es = document.getElementsByClassName('em');
    for( var i=0, node; node = ps.item(i); i++ ) node.style['display']='none';
    for( var i=0, node; node = es.item(i); i++ ) node.style['display']='block';

    // for( i in es ) es[i].style['display']='block';
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

function restrict_date_input(){
  // $('select').on('change', function() {
  // alert( this.value );
// })


  // $('.date-format').map(
    // function() {console.log(this); this.change( (v) => console.log(v));  return this.id;} ).get().join();
  // $('.date-format').change( (e) => console.log(e) );
  // $('.date-format').keypress( (v) => { console.log($(this)); return false; }  )
  d = $('.date-format');
  // $('.date-format').mask('00-00-0000');
  d.mask('00-00-0000');
  d.keypress( function(){ console.log($(this).val()) } );

  // es = $('.date-format')
  // console.log(es)
  // console.log(es[0])
  // es.map( () => console.log(this) );
  // for( i in es )
    // console.log(i)
  // for( i in es )
    // console.log(typeof(i))
    // es[i].change( () => console.log(this.value));

  // es.map( e => e.change( () => console.log(this.value); ));
  // for( i in elems )
    // es[i].onchange = function(v) { console.log(v) };

  // es.on('change', function() { console.log(this.value); } );
}