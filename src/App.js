import { useEffect, useState } from 'react'

const stories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
]

const App = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || 'React'
  )

  useEffect(() => {
    localStorage.setItem('search', searchTerm)
  }, [searchTerm])

  const handleSearch = e => {
    setSearchTerm(e.target.value)
  }

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  )
}

const Search = ({ onSearch, search }) => {
  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' onChange={onSearch} value={search} />
    </div>
  )
}

const List = ({ list }) => {
  return (
    <ul>
      {list.map(item => (
        <Item
          key={item.objectID}
          title={item.title}
          url={item.url}
          author={item.author}
          num_comments={item.num_comments}
          points={item.points}
        />
      ))}
    </ul>
  )
}

const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
)

export default App
