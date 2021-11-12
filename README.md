# Codfab

```
run: [
    // x, y, width, height (6 frames)
    0, 0, 135, 135,
    260, 0, 135, 135,
    395, 0, 135, 135,
    530, 0, 135, 135,
    665, 0, 135, 135,
    800, 0, 135, 135,
  ]
```

## To Do

- [X] Parse xml-code to preview
- [ ] Error Boundry
- [ ] Promisse to process code
- [ ] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported

# Demos
### Render Sprite
```xml
<fable>

  <scene background="bg.png">

    <agent img="box.png" x="300" y="300" width="50" height="50" />
    <agent img="box.png" x="310" y="350" width="50" height="50" />
    <agent img="box.png" x="250" y="350" width="50" height="50" />

    <agent img="block.png" x="0" y="400" width="100" height="100" />
    <agent img="block.png" x="100" y="400" width="100" height="100" />
    <agent img="block.png" x="200" y="400" width="100" height="100" />
    <agent img="block.png" x="300" y="400" width="100" height="100" />
    <agent img="block.png" x="400" y="400" width="100" height="100" />

    <agent sprite="idle.png" x="0" y="290" width="64" height="44" />

  </scene>

</fable>
```

### Action Agents 1
```xml
<fable>

  <scene background="bg.png">

    <agent img="1.png" x="0" y="400" width="100" height="100" />
    <agent img="2.png" x="100" y="400" width="100" height="100" />
    <agent img="2.png" x="200" y="400" width="100" height="100" />
    <agent img="2.png" x="300" y="400" width="100" height="100" />
    <agent img="2.png" x="400" y="400" width="100" height="100" />

    <agent img="Tree_2.png" x="310" y="250" width="150" height="150" on-touch="cortada">

      <inteira img="Tree_2.png" on-touch="cortada" />
      <cortada img="Tree_1.png" on-touch="inteira" />

    </agent>

  </scene>

</fable>`
```

### Action Agents 2
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

      <trancada img="door_1.png" on-touch="destrancada" />
      <destrancada img="door_2.png" on-touch="aberta" />
      <aberta img="door_3.png" on-touch="trancada" />

    </agent>

    <agent sprite="idle.png" x="0" y="290" width="64" height="44" />

  </scene>

</fable>
```

### Text Agents
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

      <trancada img="door_1.png" on-touch="destrancada" />
      <destrancada img="door_2.png" on-touch="aberta" />
      <aberta img="door_3.png" on-touch="trancada" />

    </agent>

    <agent sprite="idle.png" x="0" y="290" width="64" height="44">

      <KeyD x="25" />

    </agent>

    <agent text="Era uma vez uma guerreira poderosa..." x="40" y="30" width="300" on-touch="story-2">

      <story-1 text="Era uma vez uma guerreira poderosa..." on-touch="story-2" />
      <story-2 text="Que recebeu uma missão para testar suas habilidades..." on-touch="story-3" />
      <story-3 text="Que só ela poderia realizar." />

    </agent>

  </scene>

</fable>
```

### Animation Sprite
```xml
<fable>

  <scene background="bg.png">

    <agent img="1.png" x="0" y="400" width="100" height="100" />
    <agent img="2.png" x="100" y="400" width="100" height="100" />
    <agent img="2.png" x="200" y="400" width="100" height="100" />
    <agent img="2.png" x="300" y="400" width="100" height="100" />
    <agent img="2.png" x="400" y="400" width="100" height="100" />

    <agent img="block.png" x="350" y="200" draggable="true" width="200" height="200" />
    <agent img="door_1.png" x="400" y="275" width="75" height="125" on-touch="destrancada">

      <trancada img="door_1.png" on-touch="destrancada" />
      <destrancada img="door_2.png" on-touch="aberta" />
      <aberta img="door_3.png" on-touch="trancada" />

    </agent>

    <agent
      sprite="idle.png"
      x="0" y="290" width="64" height="44"
      animation-name="run"
      frame-count="6"
      animation="0, 0, 164, 113, 164, 0, 164, 113, 328, 0, 164, 113, 492, 0, 164, 113, 656, 0, 164, 113, 820, 0, 164, 113" />

  </scene>

</fable>
```

### Multi-pages com evento
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
