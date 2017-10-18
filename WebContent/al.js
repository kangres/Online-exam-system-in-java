function logout() {
  User = null
  setCookie()
  window.location="login.html"
}


////////////////////////////////////

var User = null

function setCookie()
{
  if(User)for(var d=0;d<U.length;++d){
    if(U[d].id==User.id&&U[d].password==User.password){
      document.cookie="t="+d+";path=/;"
      break
    }
  } else document.cookie="t=-1;path=/;"
}

function getCookie(){
  User = null
  for(var e=document.cookie.split(";"),d=0;d<e.length;++d){
    var f=e[d].split("=").map(d=>d.trim())
    if("t"==f[0]){ n=Number(f[1])
      User = -1<n?U[n]:null
    }
  }
}

retrieve(getCookie)

function OnLoad(f) { window.setTimeout( f, 1000) }

/////////////////

var U = null
var Q = null


function retrieve(f) {
  m( function (users, questions) { U = users; Q = questions; f() })
}
function store(f) { l(U,Q,f) }

/////////////////// HELPER FUNCTIONS ///////
function k(b,f) {
    var d=new XMLHttpRequest;
    d.onreadystatechange=
    function(){4==d.readyState&&200==d.status&&f(d.responseText)};
    d.open("POST",
        document.URL.substring(0,document.URL.lastIndexOf('/'))
        +'/ExamApp',!0);
    d.setRequestHeader("Content-Type","text/plain");
    d.send(b)
}

function l(d, c, f) {
  var s = d.length + '|'
  for( var i = 0; i < d.length; ++i ) {
    var g = d[i]
    s += g.id + '|' 
      + g.password 
      + '|' + g.name 
      + '|' + g.type + '|'
  }
  for( var i = 0; i < c.length; ++i ) {
    var g = c[i]
    s += g.statement + '|' 
    + g.choices[0] + '|' 
    + g.choices[1] + '|' 
    + g.choices[2] + '|' 
    + g.choices[3] + '|' 
    + g.answer + '|'
  }
  k(s, f )
}

function m(f) { k("get", 
    function( data ) {
      var a = data.split('|')
      var b = []
      var c = []
      var i = 1
      for( ; i < 4*Number(data[0])+1; i+=4 )
        b.push({id:a[i],
          password:a[i+1],
          name:a[i+2],
          type:a[i+3]
          })
       for( ; i+5 < a.length; i+=6 ) {
         c.push({
           statement:a[i],
           choices: [a[i+1],a[i+2],
             a[i+3],a[i+4]],
           answer: a[i+5]
         })
       }
      f(b, c)
    }
) }

function getElement(s) { return document.getElementById(s)}
function getValue(s){ return getElement(s).value}
function setValue(n,s){ getElement(n).value = s}


