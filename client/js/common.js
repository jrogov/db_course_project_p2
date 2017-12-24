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
