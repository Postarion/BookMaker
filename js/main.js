//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	
	 if(!validateForm(siteName, siteUrl)){
	    return false;
	  }

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	//Local Storage Test
	if(localStorage.getItem('bookmarks') === null)
	{
	    // Init array
	    var bookmarks = [];
	    // Add to array
	    bookmarks.push(bookmark);
	    // Set to localStorage
	    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	  } else //biorę z pamięci bookmarki, zamieniam je w coś co mogę odczytać, dodaję kolejny bookmark, wrzucam spowrotem do pamięci.
	  {
	    // Get bookmarks from localStorage
	    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	    // Add bookmark to array
	    bookmarks.push(bookmark);
	    // Re-set back to localStorage
	    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	  }

	  // Clear form
	  document.getElementById('myForm').reset();

	  // Re-fetch bookmarks
	  fetchBookmarks();

	  // Prevent form from submitting | nie zezwalaj na przesyłanie formularza
	  e.preventDefault();
}

function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
	// Re-set back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//Re fretch bookmark
	fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output VVTo jest po to żebym mógł dodać do niego stringa poniżej
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                  '</h3>'+
                                  '</div>';
  }
}

// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}