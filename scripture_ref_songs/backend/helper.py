
def get_bible_verse_id(book, chapter, verse):
    id = ''

    # add indexs to id and add leading zeros if necessary
    id += str(book).zfill(2)
    id += str(chapter).zfill(3)
    id += str(verse).zfill(3)

    return id