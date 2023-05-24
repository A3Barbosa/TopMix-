

document.querySelector('button').addEventListener('click', getDrink)

function getDrink() {
  let drink = document.querySelector('input').value
  const url = `https://api.api-ninjas.com/v1/cocktail?name=${drink}`
  fetch(url, { headers: { "X-Api-Key": `gZj7oqxaYlhcPggSrza1pAwRItxWgi9H4YPxJDJG` } })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      document.querySelector('#show').innerText = data[0].instructions
      for (let i = 0; i <=data[0].ingredients.length; i++){
        let item = document.createElement('li')
        let input = document.createElement('input')
        input.name='ingredients'
        input.type='hidden'
        document.querySelector('ul').appendChild(item)
        item.innerText= data[0].ingredients[i]
        input.value=data[0].ingredients[i]
        document.querySelector('#recipeForm').appendChild(input) 
      }
      document.querySelector('#recipeName').value=document.querySelector('#recipeSearch').value
      document.querySelector('#instructionsInput').value=document.querySelector('#show').innerText
    })


    .catch(err => {

      console.log(`error ${err})`)


    })
}


document.querySelector('input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getDrink()
  }
}
)





