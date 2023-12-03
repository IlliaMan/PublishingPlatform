const list = [
    {
      title: "Article Title 1",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 2",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 3",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 4",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 5",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 6",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 7",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 8",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 59",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    }
  ]

const getArticles = async (req, res) => {
    res.json(list);
}

export { getArticles };