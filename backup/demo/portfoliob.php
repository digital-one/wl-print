<?
$pagetitle ="Shark Design &amp; Marketing Ltd" ;
$pagedescription = "description" ;
$pageShark = "Shark, Design, Marketing, Communications, Group, Agency, 
Direct Marketing, Digital, New media, branding, campaigns, media channels, brand, identity, literature, packaging, exhibition stand, website, e-business, solution" ;

$as_wwa = "" ;
$as_ks = "" ;
$as_wwd = "" ;

$cs_one = "" ;
$cs_two = "" ;
$cs_three = "" ; 
$cs_four = "" ;
$cs_five = "" ;
$cs_archive = "" ;

$p_branding = "style='color:#ffffff;'" ;
$p_digital = "" ;
$p_dfp = "" ;
$p_ls = "" ;

$git_contactus = "" ;
$git_newsletter = "" ;

$new_moo = "<script type='text/javascript' src='scripts/mootools.js'></script>" ;

include 'includes/header.php' ;
?>
	<div id="left_cont" style="position:relative;">
   
<div id="slideshowContainer" class="slideshowContainer" style="position:relative;z-index:10;"><span></span></div>

<div id="buttons_on">
	<div id="navi_gallery">
			<div id="prev"><a href="#" onclick="javascript:show.previous(); return false;"></a></div>
			<div id="play_stop"><a href="#" onclick="javascript:show.stop(); return false;" class="play"></a><a href="#" onclick="javascript:show.play(); return false;" class="pause"></a></div>
			<div id="next"><a href="#" onclick="javascript:show.next(); return false;"></a></div>
		</div>
	</div>

	<div id="thumbnails">
		  <a href="images/Elite1-Branding.jpg" class="slideshowThumbnail"><img id="a" src="images/Elite1-Branding.jpg" width="20" height="20" style="border:0;" alt="Elite Branding 1" /></a>
		  <a href="images/Elite2-Branding.jpg" class="slideshowThumbnail"><img id="b" src="images/Elite2-Branding.jpg" width="20" height="20" style="border:0;" alt="Elite Branding 2" /></a>
		  <a href="images/Elite3-Branding.jpg" class="slideshowThumbnail"><img id="c" src="images/Elite3-Branding.jpg" width="20" height="20" style="border:0;" alt="Elite Branding 3" /></a>
		  <a href="images/Select1-Branding.jpg" class="slideshowThumbnail"><img id="d" src="images/Select1-Branding.jpg" width="20" height="20" style="border:0;" alt="Select Branding 1" /></a>
		  <a href="images/Select2-Branding.jpg" class="slideshowThumbnail"><img id="e" src="images/Select2-Branding.jpg" width="20" height="20" style="border:0;" alt="Select Branding 2" /></a>
		  <a href="images/Select3-Branding.jpg" class="slideshowThumbnail"><img id="f" src="images/Select3-Branding.jpg" width="20" height="20" style="border:0;" alt="Select Branding 3" /></a>
		  <a href="images/Select4-Branding.jpg" class="slideshowThumbnail"><img id="g" src="images/Select4-Branding.jpg" width="20" height="20" style="border:0;" alt="Select Branding 4" /></a>
		  <a href="images/TF1-Branding.jpg" class="slideshowThumbnail" ><img id="h" src="images/TF1-Branding.jpg" width="20" height="20" style="border:0;" alt="Thomas Fisher Branding 1" /></a>
		  <a href="images/TF2-Branding.jpg" class="slideshowThumbnail" ><img id="i" src="images/TF2-Branding.jpg" width="20" height="20" style="border:0;" alt="Thomas Fisher Branding 2" /></a>
		  <a href="images/TF3-Branding.jpg" class="slideshowThumbnail" ><img id="j" src="images/TF3-Branding.jpg" width="20" height="20" style="border:0;" alt="Thomas Fisher Branding 3" /></a>
	</div>
		


<script type="text/javascript">
           window.addEvent('domready',function(){
            var obj = {
               wait: 3000,
               effect: 'fade',
               duration: 1000,
               loop: true,
               thumbnails: true,
               backgroundSlider: true,
               
               onClick: function(i){var a = new Array()
         }

            }
            show = new SlideShow('slideshowContainer','slideshowThumbnail',obj);
            show.play();
         });
</script>
	
		<h3 class="page_header slideshow_fix"><img src="images/navi_b.gif" alt="Branding" style="border:0;" /><span>Branding</span></h3>

		<p>Shark! have 13 years experience in developing strong, relevant and coherent brand communication for our clients. Always fresh, flexible and founded on one original idea we make sure our brand strategies work across all media and are a true reflection of a brand's personality.</p>

		<p>Have a look at the slide show above for a glimpse of some of the work we've done to date and if you think we can help your brand, <a href="getintouchcu.php" title="Get in Touch">get in touch...</a></p>


        <br />

		<br />


	</div>
	
<?
include 'includes/footer.php' ;
?>