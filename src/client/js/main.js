(function () {
  $('.deleteBook').submit(function(e) {
    e.preventDefault()
    var book = parseInt($(this)[0].childNodes[1].value);
    $(this).parent().parent().remove()
    $.ajax({
      url: '/books/' + book,
      method: 'DELETE'
    }).done(function() {

    })
  })

  $('.deleteAuthor').submit(function(e) {
    e.preventDefault()
    var author = parseInt($(this)[0].childNodes[1].value);
    $(this).parent().parent().remove()
    $.ajax({
      url: '/authors/' + author,
      method: 'DELETE'
    }).done(function() {

    })
  })

  $('.editAuthor').submit(function(e) {
    e.preventDefault()
    var authorId = parseInt($(this)[0].childNodes[1].value);
    var authorFirst = $(this).parent().parent()[0].childNodes[3].textContent
    var authorImgUr = $(this).parent().parent()[0].childNodes[1].src
    var authorDescrip = $(this).parent().parent()[0].childNodes[7].textContent
    console.log($(this).parent().parent()[0].childNodes[7]);
    $(this).parent().parent().replaceWith(`<div class="oneBook">
      <form class="editingAuthor" id="editingAuthor">
        <img src="${authorImgUr}" alt="" class="img"/>
        <label for="first_name">First name</label>
        <input type="text" name="first_name" value="${authorFirst}"><br>

        <label for="portrait_url">Portrait url</label>
        <input type="text" name="portrait_url" value="${authorImgUr}"><br><br>

        <label for="description">description</label><br>
        <textarea name="description" rows="8" cols="40" value="hwfas"></textarea>
      </form>
    </div>`)
    // $.ajax({
    //   url: '/authors/' + author,
    //   method: 'PUT'
    // })
  })
})();
