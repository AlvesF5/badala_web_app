document.getElementById('next').onclick = function () {
   let lists = document.querySelectorAll('.item');
   document.getElementById('slide').appendChild(lists[0]);
   let listsdes = document.querySelectorAll('.desc');
   document.getElementById('slide-text').appendChild(listsdes[0]);
}
document.getElementById('prev').onclick = function () {
   let lists = document.querySelectorAll('.item');
   document.getElementById('slide').prepend(lists[lists.length - 1]);
   let listsdes = document.querySelectorAll('.desc');
   document.getElementById('slide-text').prepend(listsdes[listsdes.length - 1]);
}
