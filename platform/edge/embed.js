// Source Digital Loader 1.0a...
window.addEventListener("load", function(){
  function i(u){ var r = new XMLHttpRequest();r.open("GET",u,false);r.send(null);return r.responseText;}
  var ee = eval(i('https://cdn.sourcesync.io/experience/1.0a/index.js'))
  var e = document.querySelectorAll('[data-sd-experience]');
  [].forEach.call(e, function(el) {
    var created = function () {this.experience = el.getAttribute('data-sd-experience')}
    new Vue(Object.assign({el, created}, ee))
  });
});
