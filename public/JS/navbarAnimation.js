window.onscroll = function() {scrollFunctionNavbar()};

function scrollFunctionNavbar() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.getElementById("navbar").style.padding = "2px 10px";
      document.getElementById("logo").style.fontSize = "35px";
      document.getElementById("navbar").style.backgroundColor = "#252627e1";
    } else {
      document.getElementById("navbar").style.padding = "20px 10px";
      document.getElementById("logo").style.fontSize = "45px";
      document.getElementById("navbar").style.backgroundColor = "#252627";
    }
}