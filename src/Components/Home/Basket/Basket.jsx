import React, { useState } from 'react';
import { BasketItem } from './BasketItem/BasketItem';
import { helperBasket } from 'helpers/helpers';
import { basket, newBasketState, increaseQuantity } from '../../../basket-data/basket-data';

/**
 * Компонент корзины с товарами.
 * Component of the basket of goods
 */
export const Basket = () => {
  /**
   * Список состояния продуктов в корзине в виде массива.
   * List of product status in the basket as an array
   */
  const basketState = basket.basketState;

  // console.log('basketState>>>', basketState);
  // console.log('basketProducts>>>', basket.basketProducts);

  /**
   * Функция уменьшает в корзине количество товара конкретной позиции.
   * The function decreases the quantity of the product in the basket
   */
  const decreaseQuantity = (id) => {
    const indexes = helperBasket(id, basket);

    const indxSt = indexes.indxSt;
    const prevQuantity = indexes.prevQuantity;
    const prevSum = indexes.prevSum;

    const currentProduct = {
      id,
      quantity: prevQuantity - 1,
      sum: prevSum * (prevQuantity - 1),
    };

    basket.basketState = newBasketState(indxSt, currentProduct);
    basket.basketProducts = [...basket.basketProducts];
  };

  /**
   * Функция считает общее количество товара в корзине.
   * The function calculates the total quantity of goods in the basket.
   */
  const totalProductsQuantity = () => basket.basketState.reduce((acc, cur) => acc + cur.quantity, 0);

  // Hook Отслеживает изменения в общем количестве товаров.
  // Hook Track changes in the total quantity of goods
  const [productsQuantity, setBasket] = useState(totalProductsQuantity());
  /**
   * Функция изменяет общее количество товаров.
   * The function changes the total quantity of goods.
   */
  const changeTotalQuantity = () => {
    setBasket(totalProductsQuantity());
  };

  /**
   * Функция вычисляет общую стоимость товаров в корзине.
   * The function calculates the total cost of goods in the basket.
   */
  const total = () => basketState.reduce((acc, cur) => acc + cur.sum, 0);

  /**
   * Функция формирует список товаров в корзине.
   * The function creates a list of goods in the basket
   */
  const renderBasket = () =>
    basket.basketProducts.map((product) => {

      return (
        <BasketItem
          key={product.id}
          item={product}
          initialBasketState={basket.basketState}
          // FIXME: TODO: функция должна увеличивать количество товаров в корзине через корзину
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          changeQuantity={changeTotalQuantity}
        />
      );
    });

  return (
    <div className='flex'>
      <section className='w-2/3 mx-auto p-2 bg-gray-200'>{renderBasket()}</section>
      <section className='w-1/3 p-2'>
        <div className='w-full h-full border border-gray-400 p-4'>
          <p className='font-medium mb-4'>Всего товаров: {productsQuantity}</p>
          <p className='font-bold'>Товары на сумму: {total()} ₽</p>
        </div>
      </section>
    </div>
  );
};
