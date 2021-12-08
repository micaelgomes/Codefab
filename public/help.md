## Antes de começar...
Se você já tem experiência com HTML e versionamento de código utilizando Git, pode pular direto para a seção do Fábulas. Porém, se estes termos não são conhecidos por você fique por aqui e veja as recomendações.

O codefab é uma plataforma que funciona com a integração em um serviço de versionamento de código. Essa plataforma se chama [GitHub](https://github.com/), onde é possível realizar  hospedagem de código-fonte e arquivos com controle de versão usando o Git. Para ficar mais claro, vou deixar um video explicando os motivos de você entender este ramo da tecnologia.

<iframe width="560" height="315" src="https://www.youtube.com/embed/DqTITcMq68k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Além de uma conta no Github, é interessante entender o que é uma tag, já que é um conceito importante para escrever uma fábula.

#### O que é uma tag?
Tags em geral são estruturas de linguagem de marcação, seguindo a forma `<tag>`, que contém instruções para os navegadores no momento em que são lidas. Se tiver mais interesse no assungo [acesse W3Shools](https://www.w3schools.com/xml/dom_nodetype.asp), lá você irá encontrar conteúdo gratuito e de qualidade.

Se ainda quiser saber mais:

<iframe width="560" height="315" src="https://www.youtube.com/embed/3oSIqIqzN3M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# 🚀 Começando no Codefab

<a href="https://www.codefab.tk/">Link do Playground - Codefab</a>

### Login na aplicação

<iframe src="https://player.vimeo.com/video/654356505?h=78aa6f624a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="600" height="338" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="login"></iframe>

### Menu do usuário

<iframe src="https://player.vimeo.com/video/654356550?h=d4f835497c&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="600" height="338" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="menu do usuario"></iframe>

### Botões de ação

<iframe src="https://player.vimeo.com/video/654362180?h=cd49d6f49b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="600" height="338" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="bot&amp;otilde;es"></iframe>

### Galeria e Guia de ajuda

<iframe src="https://player.vimeo.com/video/654356462?h=d8adf3cb1a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="600" height="338" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="guia de ajuda e galeria"></iframe>


## Criando um projeto

<iframe src="https://player.vimeo.com/video/654356087?h=c8ca8e1db7&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="600" height="338" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="criando uma fabula.mp4"></iframe>

## Vamos escrever Fábulas
O Modelo Fábulas surge a partir de uma análise de elementos comuns na criação de e-Books. No playground, a fábula é declarada com o uso da tag `<fable>`.

```xml
<fable>

  <!-- CONTEÚDO DA FÁBULA -->

</fable>
```

## Pages

A page é uma respresentação de uma página de um livro Físico. Para ser declarada é usada a tag `<page>`. Cada Page da história pode ser composta por diferentes objetos de mídia (Imagem, Texto, Sprite).

| Propriedades | descrição                                                      | obrigatório? |
|--------------|----------------------------------------------------------------|--------------|
| background   | Imagem de fundo da page                                        | sim          |
| soundtrack   | Trilha sonora que será executada apenas page que for declarada | não          |


```xml
<fable>
  <page>
  <!-- CONTEÚDO DA FÁBULA -->
  </page>
</fable>
```

A page tem uma característica interessante, que é a utilização de propriedades. Desta forma, é possível definir uma imagem de fundo, o background da page.

Além disso é possível usar uma trilha sonora através da propriedade `soundtrack`.

#### Exemplos de como usar :
```xml
<fable>
  <page background="name_image.png">
  <!-- CONTEÚDO DA FÁBULA -->
  </page>
</fable>
```
```xml
<fable>
  <page background="name_image.png" soundtrack="intro.wav">
  <!-- CONTEÚDO DA FÁBULA -->
  </page>
</fable>
```

## Agents

Agentes são o último elo da cadeia, é quem é reponsável por carregar os diferentes objetos de mídia (Imagem, Texto, Sprite) suportados pelo playground.

```xml
<fable>
  <page>

    <agent></agent> ou <agent />

  </page>
</fable>
```


Assim como a `<page>` tem uma propriedade de background, a tag `<agent>` tem algumas que são obrigatórias para serem desenhadas.
```xml
  <agent x="40" y="350" width="500" height="100"></agent>
```
### Desenhando Texto
Além das propriedades citadas anteriormente, podemos observar outras duas que não são obrigatórias: `font-size="22"` e `color="blue"`. Para o tamanho da fonte é usado um número natural, e para a cor é usado o nome da cor, que pode ser encontrada no [guia de cores aceitas no CSS](https://www.w3.org/wiki/CSS/Properties/color/keywords).


| Propriedades | descrição                                                                                                       | obrigatório? |
|--------------|-----------------------------------------------------------------------------------------------------------------|----------------|
| text         | conteúdo que será desenhado                                                                                   | sim            |
| x            | posição no eixo horizontal, pode variar de 0 a 500. números negativos ou maiores que 500 ficam fora da tela. | sim            |
| y            | posição no eixo vertical, pode variar de 0 a 500. números negativos ou maiores que 500 ficam fora da tela.   | sim            |
| width        | largura do texto na tela                                                                                        | não           |
| height       | comprimento do texto na tela                                                                                    | não           |
| color        | cor do texto                                                                                                    | não           |
| font-size    | tamanho da fonte do texto                                                                                       | não           |

#### Exemplos de como usar :

```xml
<fable>
  <page>

    <agent
      text="Clique em uma carta" font-size="22" color="blue" x="40" y="350" width="500" height="100" />

  </page>
</fable>
```
### Desenhando Imagens

Para renderizar imagens segue o mesmo princípio, a tabela abaixo exibe as propriedades necessárias

| Propriedades | descrição                                                                                                       | é obrigatório? |
|--------------|-----------------------------------------------------------------------------------------------------------------|----------------|
| img         | nome da imagem que foi importada para o projeto. Ex: `name-image.png`                                                               | sim            |
| x            | posição no eixo horizontal, pode variar de 0 a 500. números negativos ou maiores que 500 ficam fora da tela. | sim            |
| y            | posição no eixo vertical, pode variar de 0 a 500. números negativos ou maiores que 500 ficam fora da tela.   | sim            |
| width        | largura da imagem na tela                                                                                        | sim           |
| height       | comprimento da imagem na tela                                                                                    | sim           |


#### Exemplos de como usar :

```xml
<fable>
  <page>

    <agent img="name_image.png" x="100" y="100" width="100" height="100" />

  </page>
</fable>
```

## Exemplos

### Explicando o Exemplo de Gatilhos

<iframe src="https://player.vimeo.com/video/654356151?h=7f0243d05d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="600" height="338" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="exemplo 1.mp4"></iframe>


### Explicando o Exemplo de Navegação entre pages

<iframe src="https://player.vimeo.com/video/654356377?h=7a2bf01434&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="600" height="338" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="exemplo 2.mp4"></iframe>

#### Exemplo de fábula básica
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

## Outros Exemplos


#### Elementos Básicos
<a href="www.codefab.tk/fable/view/micaelteste/Elementos-basicos">www.codefab.tk/fable/view/micaelteste/Elementos-basicos</a>

#### Drag and Drop
<a href="www.codefab.tk/fable/view/micaelteste/drop-zone">www.codefab.tk/fable/view/micaelteste/drop-zone</a>

#### Trabalhando com Multi-Pages (Navegação)
<a href="www.codefab.tk/fable/view/micaelteste/navegacao-pages">www.codefab.tk/fable/view/micaelteste/navegacao-pages</a>

#### Gatilhos
<a href="www.codefab.tk/fable/view/micaelteste/entendendo-gatilhos">www.codefab.tk/fable/view/micaelteste/entendendo-gatilhos</a>

#### Fabula completa de exemplo
<a href="www.codefab.tk/fable/view/micaelteste/O-pequeno-cavaleiro">www.codefab.tk/fable/view/micaelteste/O-pequeno-cavaleiro</a>

## Tópicos avançados
#### Animação de Sprite
```xml
<fable>
  <scene background="bg.png">

    <agent sprite="idle.png" x="60" y="90" width="164" height="113" frame-count="6" fps="8" on-touch="up">
    	<up sprite="run.png" x="60" y="90" width="164" height="113" frame-count="8" fps="8" />
    </agent>

  </scene>
</fable>
```

