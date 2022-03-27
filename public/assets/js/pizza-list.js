const $pizzaList = document.querySelector('#pizza-list');

const getPizzaList = () => {
  fetch('/api/pizzas')
    .then(response => response.json()) // transform response into JSON data that we can use
    .then(pizzaListArr => {
      console.log(pizzaListArr)
      pizzaListArr.forEach(printPizza); // run each item in array through the printPizza function using the .forEach() method
    })
    .catch(err => {
      console.log(err)
    });
};

const printPizza = ({ _id, pizzaName, toppings, size, commentCount, createdBy, createdAt }) => {
  const pizzaCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${pizzaName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By ${createdBy}</h4>
          <p>On ${createdAt}</p>
          <p>${commentCount} Comments</p>
          <h5 class="text-dark">Suggested Size: ${size}
          <h5 class="text-dark">Toppings</h5>
          <ul>
            ${toppings
      .map(topping => {
        return `<li>${topping}</li>`;
      })
      .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/pizza?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $pizzaList.innerHTML += pizzaCard;
};

// call function so that on page load, the api will make the call to the db
getPizzaList();
