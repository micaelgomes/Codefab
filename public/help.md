## Fábulas
O Modelo Fábulas surge a partir de uma análise de elementos comuns na criação de e-Books. No playground, a fábula é declarada com o uso da tag `<fable>`.

```xml
<fable>

  <!-- CONTEÚDO DA FÁBULA -->

</fable>
```

### O que é uma tag?
Tags em geral são estruturas de linguagem de marcação, seguindo a forma `<tag>`, que contém instruções para os navegadores no momento em que são lidas. Se tiver mais interesse no assungo [acesse W3Shools](https://www.w3schools.com), lá você irá encontrar conteúdo gratuito e de qualidade.

## Pages

A page é uma respresentação de uma página de um livro Físico. Para ser declarada é usada a tag `<page>`. Cada Page da história pode ser composta por diferentes objetos de mídia (Imagem, Texto, Sprite).


```xml
<fable>
  <page>
  <!-- CONTEÚDO DA FÁBULA -->
  </page>
</fable>
```

A page tem uma característica interessante, que é a utilização de propriedades. Desta forma, é possível definir uma imagem de fundo, o background da page.

```xml
<fable>
  <page background="name_image.png">
  <!-- CONTEÚDO DA FÁBULA -->
  </page>
</fable>
```

## Agents

Agentes são o último elo da cadeia, é quem é reponsável por carregar os diferentes objetos de mídia (Imagem, Texto, Sprite) suportados pelo playground.

```xml
<fable>
  <page>

    <agent></agent>

  </page>
</fable>
```

Assim como a `<page>` tem uma propriedade de background, a tag `<agent>` tem algumas que são obrigatórias para serem desenhadas.
```xml
  <agent x="40" y="350" width="500" height="100"></agent>
```
### Desenhando Texto
Além das propriedades citadas anteriormente, podemos observar outras duas que não são obrigatórias: `font-size="22"` e `color="blue" `. Para o tamanho da fonte é usado um número natural, e para a cor é usado o nome da cor da em inglês.

```xml
<fable>
  <page>

    <agent
      text="Clique em uma carta" font-size="22" color="blue"
      x="40" y="350" width="500" height="100" />

  </page>
</fable>
```
### Desenhando Imagens

```xml
<fable>
  <page>

    <agent img="name_image.png" x="100" y="100" width="100" height="100" />

  </page>
</fable>
```
## Exemplos

#### Primeira fábula
```xml
<fable>
  <scene background="bg.png">

    <agent img="box.png" x="300" y="350" width="50" height="50" />
    <agent img="box.png" x="260" y="300" width="50" height="50" />
    <agent img="box.png" x="245" y="350" width="50" height="50" />

    <agent img="block.png" x="0" y="400" width="100" height="100" />
    <agent img="block.png" x="100" y="400" width="100" height="100" />
    <agent img="block.png" x="200" y="400" width="100" height="100" />
    <agent img="block.png" x="300" y="400" width="100" height="100" />
    <agent img="block.png" x="400" y="400" width="100" height="100" />

  </scene>
</fable>
```

#### Action Agents - Exemplo 1
```xml
<fable>
  <scene background="bg.png">

    <agent img="1.png" x="0" y="400" width="100" height="100" />
    <agent img="2.png" x="100" y="400" width="100" height="100" />
    <agent img="2.png" x="200" y="400" width="100" height="100" />
    <agent img="2.png" x="300" y="400" width="100" height="100" />
    <agent img="2.png" x="400" y="400" width="100" height="100" />

    <agent
      img="Tree_2.png" x="310" y="250" width="150" height="150"
      on-touch="cortada" on-trigger="cortada">

      <cortada img="Tree_1.png" y="350" width="100" height="50" on-touch="inteira" on-trigger="inteira" />

    </agent>

  </scene>
</fable>`
```

#### Action Agents - Exemplo 2
```xml
<fable>
  <scene background="bg.png">

    <agent img="1.png" x="0" y="400" width="100" height="100" />
    <agent img="2.png" x="100" y="400" width="100" height="100" />
    <agent img="2.png" x="200" y="400" width="100" height="100" />
    <agent img="2.png" x="300" y="400" width="100" height="100" />
    <agent img="2.png" x="400" y="400" width="100" height="100" />

    <agent img="block.png" x="350" y="200" width="200" height="200" />
    <agent img="door_1.png" x="400" y="275" width="75" height="125" on-touch="destrancada">

      <destrancada img="door_2.png" on-touch="aberta" />

    </agent>

  </scene>
</fable>
```

#### Trabalhando com Multi-Pages
```xml
<fable width="" height="" title="" thumb="" start-in="2">

  <page background="bg.png">

    <agent text="Clique na placa para seguir" x="40" y="30" width="250" />

  	<agent img="cavaleiro.png" x="100" y="285" width="100" height="125" on-trigger="" />

    <terra img="block.png" x="50" y="400" width="200" height="200" />
    <penhasco img="13.png" x="400" y="350" width="100" height="75" />

    <agent img="Sign_2.png" x="420" y="300" width="50" height="50" on-touch="_NEXT_PAGE" />

    <agua img="17.png" x="0" y="450" width="100" height="100" />
    <agua img="17.png" x="100" y="450" width="100" height="100" />
    <agua img="17.png" x="200" y="450" width="100" height="100" />
    <agua img="17.png" x="300" y="450" width="100" height="100" />
    <agua img="17.png" x="400" y="450" width="100" height="100" />

  </page>

  <page background="noite.png">
    <agent text="Anoiteceu e tu nem viu..." x="40" y="20" width="350" font-size="26" color="white" />

  	<agent img="cavaleiro.png" x="100" y="285" width="100" height="125" on-trigger="" />

    <agent img="Tree_3.png" x="325" y="150" width="175" height="250" />
    <agent img="SnowMan.png" x="425" y="320" width="75" height="85" on-touch="_NEXT_PAGE" />
    <agent img="box.png" x="325" y="350" width="50" height="50" />

    <agua img="1.png" x="0" y="400" width="100" height="100" />
    <agua img="2.png" x="100" y="400" width="100" height="100" />
    <agua img="2.png" x="200" y="400" width="100" height="100" />
    <agua img="2.png" x="300" y="400" width="100" height="100" />
    <agua img="2.png" x="400" y="400" width="100" height="100" />

  </page>

  <page background="noite_dark.png">
    <agent text="Auuuuuu..." x="40" y="20" width="350" font-size="18" color="white" />

  	<agent img="Dead (9).png" x="20" y="310" width="110" height="100" on-trigger="" />

    <agent img="Tree.png" x="325" y="150" width="175" height="250" />
    <agent img="TombStone (2).png" x="325" y="350" width="50" height="50" on-touch="_NEXT_PAGE" />
    <agent img="TombStone (1).png" x="275" y="350" width="50" height="50" on-touch="_NEXT_PAGE" />

    <agua img="Tile (1).png" x="0" y="400" width="100" height="100" />
    <agua img="Tile (2).png" x="100" y="400" width="100" height="100" />
    <agua img="Tile (2).png" x="200" y="400" width="100" height="100" />
    <agua img="Tile (2).png" x="300" y="400" width="100" height="100" />
    <agua img="Tile (2).png" x="400" y="400" width="100" height="100" />

    <agent img="Bone (1).png" x="375" y="425" width="50" height="50" on-touch="THE_END" />
    <agent img="evo.png" x="100" y="260" width="150" height="150" on-touch="THE_END" />


  </page>


</fable>
```


## Tópicos avançados
#### Animação de Sprite
```xml
<fable>
  <scene background="bg.png">

    <agent
      sprite="sprite_name.png"
      x="0" y="290" width="64" height="44"
      animation-name="run"
      frame-count="6"
      animation="0, 0, 164, 113, 164, 0, 164, 113, 328, 0, 164, 113, 492, 0, 164, 113, 656, 0, 164, 113, 820, 0, 164, 113" />

  </scene>
</fable>
```

http://localhost:3000/fable/view/alfredots/teste-pokemon
