import React, { useState, useEffect } from "react";
import { Coin } from "../Coin";
import { cryptoHttp } from "../../http";

import "./index.css";

interface HeaderProps {
  onSelected: (coin: string) => void;
}

//Definição do tipo price
interface Price {
  [key: string]: { oldPrice: number; currentPrice: number };
}

//Moedas
const ALL_PRICES: Price = {
  BTC: { oldPrice: 0, currentPrice: 0 },
  LTC: { oldPrice: 0, currentPrice: 0 },
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { onSelected } = props

  const [prices, setPrices] = useState<Price>(ALL_PRICES);

  //Pegando a cotação para cada moeda cadastrada
  useEffect(() => {
    const intervals = Object.keys(ALL_PRICES).map((coin) => {
      return setInterval(() => {
        //Fazendo requisição para pegar valor da moeda
        cryptoHttp.get(`price?fsym=${coin}&tsyms=BRL`).then((response) => {
          //Atualizando os preços
          setPrices((prevState) => {
            //Validação se o preço da moeda está igual
            if(prevState[coin].currentPrice === response.data.BRL) {
              return prevState
            }

            //Retorna o valor que já possui
            return {
              ...prevState,
              //Atualizando posição no obj
              [coin]: {
                oldPrice: prevState[coin].currentPrice,
                currentPrice: response.data.BRL,
              },
            };
          });
        });
      }, 5000);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval))
    }
  }, []);

  return (
    <div className="Header">
      {Object.keys(prices).map((coin) => (
        <div onClick={() => onSelected(coin)}>
          <Coin
            coin={coin}
            oldPrice={prices[coin].oldPrice}
            currentPrice={prices[coin].currentPrice}
          />
        </div>
      ))}
    </div>
  );
};
