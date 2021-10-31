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
