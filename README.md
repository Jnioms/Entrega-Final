# ProyectoFinalJS-Marcos

Proyecto Final para el curso de JS en CoderHouse.

#### Calculadora interactiva para carga de Criptomonedas.

La carga de criptomonedas se hace mediante la pagina web (JS maneja el DOM).

Se pueden ingresar el nombre (solo andan ADA, BNB, BTC, ETH y SOL por el momento), precio de compra y cantidad. 
El codigo automaticamente lo agrega a la tabla de la pagina web y hago un request a la API publica de Binance para obtener el precio actual.

Puede eliminarse cada elemento y haciendo click en la tabla sobre el precio o en la cantidad, te permite modificar los datos del mismo.

Tambien hay un campo de filtrado que permite buscar elementos en la tabla por nombre. 
Para evitar request multiples a la API de Binance, hay que apretar Enter o clickear afuera del campo de texto para ejecutar el filtrado.
