# Título
Graficador de valores de tensión.
## General
Mostrar por tabla y gráfico, valores de tensión que son cargados por el usuario por medio de la página web.
Asimismo el sitio web muestra un conjunto de mediciones previas que se encuentran almacenadas en un archivo JSON.

La mediciones previas se obtiene por medio del método HTTP GET, los cuales se implementan por medio de promise y AJAX. Antes de ello, el usuario se debe "loggear". Los datos por defecto son:

usr: carlos@correo.com
pass: ingreso01

Por otro lado el sitio cuenta con campos para cargar las mediciones de manuera manual. Para ello se introduce el instante de tiempo de la medición, el valor de tensión y la unidad de medida. El formato para la carga del instante es: "YYYY-MM-DDThh:mm:ss".

Pero, ¿Qué tiene de interesante este sitio?

El gráfico se realiza por medio de un elemento SVG (gráficos vectorizados) y código javascript. Si bien existen librerías para hacer gráfico como el que realiza el sitio web, en algunas ocaciones estos no cumplen con los requisitos del proyecto. Algunas de ellas, tienen una estructura definida para presentar las etiquetas de las escalas, lo cual genera dificultades en algunos proyectos. 

Por tal motivo me resultó interesante realizar una primera aproximación que permita en un futuro realizar gráficos vectorizados y personalizados y que se generen a partir de los datos que se encuentran en un JSON.






