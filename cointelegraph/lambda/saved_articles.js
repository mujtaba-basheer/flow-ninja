let saved_articles = $var.Users.saved_articles;
if (!(saved_articles && Array.isArray(saved_articles))) saved_articles = [];
const slug = $input.articleData.slug;
switch ($input.action) {
  case "remove": {
    const index = saved_articles.findIndex((a) => a.slug === slug);
    if (index !== -1) {
      saved_articles.splice(index, 1);
    }
    break;
  }
  case "save": {
    const index = saved_articles.findIndex((a) => a.slug === slug);
    if (index === -1) {
      saved_articles.push($input.articleData);
    }
    break;
  }
  default: {
    const index = saved_articles.findIndex((a) => a.slug === slug);
    if (index !== -1) {
      saved_articles.splice(index, 1);
    }
    break;
  }
}

return saved_articles;
