# Mermaid‑CLI – Command‑Line Interface for Mermaid

Mermaid‑CLI is a lightweight command‑line tool that converts Mermaid diagram definitions into SVG, PNG or PDF files.  
It can also transform Markdown files that contain Mermaid code blocks into Markdown that references generated SVGs.

> **Tip** – The CLI is available as a global npm package, a Docker image, or via the Node.js API.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic conversion](#basic-conversion)
  - [Advanced options](#advanced-options)
  - [Piping from stdin](#piping-from-stdin)
  - [Markdown transformation](#markdown-transformation)
- [Alternative Installations](#alternative-installations)
  - [Docker / Podman](#docker--podman)
  - [Node.js API](#nodejs-api)
  - [Local install / npx](#local-install--npx)
- [Examples](#examples)
- [Known Issues](#known-issues)
- [Contributing](#contributing)

---

## Installation

### Global npm

```bash
npm install -g @mermaid-js/mermaid-cli
```

### Docker / Podman

```bash
docker pull ghcr.io/mermaid-js/mermaid-cli/mermaid-cli
```

### Local install

```bash
npm install @mermaid-js/mermaid-cli
./node_modules/.bin/mmdc -h
```

### npx

```bash
npx -p @mermaid-js/mermaid-cli mmdc -h
```

> **Note** – The `-p` flag is required because the package name differs from the command name (`mmdc`).

---

## Usage

### Basic conversion

```bash
mmdc -i input.mmd -o output.svg
```

### Advanced options

| Option | Description | Example |
|-------|------------|--------|
| `-t, --theme <theme>` | Theme (`default`, `dark`, `forest`, `neutral`, `base`, `base2`, `dark2`, `dark3`, `dark4`, `dark5`, `dark6`, `dark7`, `dark8`, `dark9`, `dark10`, `dark11`, `dark12`, `dark13`, `dark14`, `dark15`, `dark16`, `dark17`, `dark18`, `dark19`, `dark20`, `dark21`, `dark22`, `dark23`, `dark24`, `dark25`, `dark26`, `dark27`, `dark28`, `dark29`, `dark30`, `dark31`, `dark32`, `dark33`, `dark34`, `dark35`, `dark36`, `dark37`, `dark38`, `dark39`, `dark40`, `dark41`, `dark42`, `dark43`, `dark44`, `dark45`, `dark46`, `dark47`, `dark48`, `dark49`, `dark50`, `dark51`, `dark52`, `dark53`, `dark54`, `dark55`, `dark56`, `dark57`, `dark58`, `dark59`, `dark60`, `dark61`, `dark62`, `dark63`, `dark64`, `dark65`, `dark66`, `dark67`, `dark68`, `dark69`, `dark70`, `dark71`, `dark72`, `dark73`, `dark74`, `dark75`, `dark76`, `dark77`, `dark78`, `dark79`, `dark80`, `dark81`, `dark82`, `dark83`, `dark84`, `dark85`, `dark86`, `dark87`, `dark88`, `dark89`, `dark90`, `dark91`, `dark92`, `dark93`, `dark94`, `dark95`, `dark96`, `dark97`, `dark98`, `dark99`, `dark100`, `dark101`, `dark102`, `dark103`, `dark104`, `dark105`, `dark106`, `dark107`, `dark108`, `dark109`, `dark110`, `dark111`, `dark112`, `dark113`, `dark114`, `dark115`, `dark116`, `dark117`, `dark118`, `dark119`, `dark120`, `dark121`, `dark122`, `dark123`, `dark124`, `dark125`, `dark126`, `dark127`, `dark128`, `dark129`, `dark130`, `dark131`, `dark132`, `dark133`, `dark134`, `dark135`, `dark136`, `dark137`, `dark138`, `dark139`, `dark140`, `dark141`, `dark142`, `dark143`, `dark144`, `dark145`, `dark146`, `dark147`, `dark148`, `dark149`, `dark150`, `dark151`, `dark152`, `dark153`, `dark154`, `dark155`, `dark156`, `dark157`, `dark158`, `dark159`, `dark160`, `dark161`, `dark162`, `dark163`, `dark164`, `dark165`, `dark166`, `dark167`, `dark168`, `dark169`, `dark170`, `dark171`, `dark172`, `dark173`, `dark174`, `dark175`, `dark176`, `dark177`, `dark178`, `dark179`, `dark180`, `dark181`, `dark182`, `dark183`, `dark184`, `dark185`, `dark186`, `dark187`, `dark188`, `dark189`, `dark190`, `dark191`, `dark192`, `dark193`, `dark194`, `dark195`, `dark196`, `dark197`, `dark198`, `dark199`, `dark200`, `dark201`, `dark202`, `dark203`, `dark204`, `dark205`, `dark206`, `dark207`, `dark208`, `dark209`, `dark210`, `dark211`, `dark212`, `dark213`, `dark214`, `dark215`, `dark216`, `dark217`, `dark218`, `dark219`, `dark220`, `dark221`, `dark222`, `dark223`, `dark224`, `dark225`, `dark226`, `dark227`, `dark228`, `dark229`, `dark230`, `dark231`, `dark232`, `dark233`, `dark234`, `dark235`, `dark236`, `dark237`, `dark238`, `dark239`, `dark240`, `dark241`, `dark242`, `dark243`, `dark244`, `dark245`, `dark246`, `dark247`, `dark248`, `dark249`, `dark250`, `dark251`, `dark252`, `dark253`, `dark254`, `dark255`, `dark256`, `dark257`, `dark258`, `dark259`, `dark260`, `dark261`, `dark262`, `dark263`, `dark264`, `dark265`, `dark266`, `dark267`, `dark268`, `dark269`, `dark270`, `dark271`, `dark272`, `dark273`, `dark274`, `dark275`, `dark276`, `dark277`, `dark278`, `dark279`, `dark280`, `dark281`, `dark282`, `dark283`, `dark284`, `dark285`, `dark286`, `dark287`, `dark288`, `dark289`, `dark290`, `dark291`, `dark292`, `dark293`, `dark294`, `dark295`, `dark296`, `dark297`, `dark298`, `dark299`, `dark300`, `dark301`, `dark302`, `dark303`, `dark304`, `dark305`, `dark306`, `dark307`, `dark308`, `dark309`, `dark310`, `dark311`, `dark312`, `dark313`, `dark314`, `dark315`, `dark316`, `dark317`, `dark318`, `dark319`, `dark320`, `dark321`, `dark322`, `dark323`, `dark324`, `dark325`, `dark326`, `dark327`, `dark328`, `dark329`, `dark330`, `dark331`, `dark332`, `dark333`, `dark334`, `dark335`, `dark336`, `dark337`, `dark338`, `dark339`, `dark340`, `dark341`, `dark342`, `dark343`, `dark344`, `dark345`, `dark346`, `dark347`, `dark348`, `dark349`, `dark350`, `dark351`, `dark352`, `dark353`, `dark354`, `dark355`, `dark356`, `dark357`, `dark358`, `dark359`, `dark360`, `dark361`, `dark362`, `dark363`, `dark364`, `dark365`, `dark366`, `dark367`, `dark368`, `dark369`, `dark370`, `dark371`, `dark372`, `dark373`, `dark374`, `dark375`, `dark376`, `dark377`, `dark378`, `dark379`, `dark380`, `dark381`, `dark382`, `dark383`, `dark384`, `dark385`, `dark386`, `dark387`, `dark388`, `dark389`, `dark390`, `dark391`, `dark392`, `dark393`, `dark394`, `dark395`, `dark396`, `dark397`, `dark398`, `dark399`, `dark400`, `dark401`, `dark402`, `dark403`, `dark404`, `dark405`, `dark406`, `dark407`, `dark408`, `dark409`, `dark410`, `dark411`, `dark412`, `dark413`, `dark414`, `dark415`, `dark416`, `dark417`, `dark418`, `dark419`, `dark420`, `dark421`, `dark422`, `dark423`, `dark424`, `dark425`, `dark426`, `dark427`, `dark428`, `dark429`, `dark430`, `dark431`, `dark432`, `dark433`, `dark434`, `dark435`, `dark436`, `dark437`, `dark438`, `dark439`, `dark440`, `dark441`, `dark442`, `dark443`, `dark444`, `dark445`, `dark446`, `dark447`, `dark448`, `dark449`, `dark450`, `dark451`, `dark452`, `dark453`, `dark454`, `dark455`, `dark456`, `dark457`, `dark458`, `dark459`, `dark460`, `dark461`, `dark462`, `dark463`, `dark464`, `dark465`, `dark466`, `dark467`, `dark468`, `dark469`, `dark470`, `dark471`, `dark472`, `dark473`, `dark474`, `dark475`, `dark476`, `dark477`, `dark478`, `dark479`, `dark480`, `dark481`, `dark482`, `dark483`, `dark484`, `dark485`, `dark486`, `dark487`, `dark488`, `dark489`, `dark490`, `dark491`, `dark492`, `dark493`, `dark494`, `dark495`, `dark496`, `dark497`, `dark498`, `dark499`, `dark500`, `dark501`, `dark502`, `dark503`, `dark504`, `dark505`, `dark506`, `dark507`, `dark508`, `dark509`, `dark510`, `dark511`, `dark512`, `dark513`, `dark514`, `dark515`, `dark516`, `dark517`, `dark518`, `dark519`, `dark520`, `dark521`, `dark522`, `dark523`, `dark524`, `dark525`, `dark526`, `dark527`, `dark528`, `dark529`, `dark530`, `dark531`, `dark532`, `dark533`, `dark534`, `dark535`, `dark536`, `dark537`, `dark538`, `dark539`, `dark540`, `dark541`, `dark542`, `dark543`, `dark544`, `dark545`, `dark546`, `dark547`, `dark548`, `dark549`, `dark550`, `dark551`, `dark552`, `dark553`, `dark554`, `dark555`, `dark556`, `dark557`, `dark558`, `dark559`, `dark560`, `dark561`, `dark562`, `dark563`, `dark564`, `dark565`, `dark566`, `dark567`, `dark568`, `dark569`, `dark570`, `dark571`, `dark572`, `dark573`, `dark574`, `dark575`, `dark576`, `dark577`, `dark578`, `dark579`, `dark580`, `dark581`, `dark582`, `dark583`, `dark584`, `dark585`, `dark586`, `dark587`, `dark588`, `dark589`, `dark590`, `dark591`, `dark592`, `dark593`, `dark594`, `dark595`, `dark596`, `dark597`, `dark598`, `dark599`, `dark600`, `dark601`, `dark602`, `dark603`, `dark604`, `dark605`, `dark606`, `dark607`, `dark608`, `dark609`, `dark610`, `dark611`, `dark612`, `dark613`, `dark614`, `dark615`, `dark616`, `dark617`, `dark618`, `dark619`, `dark620`, `dark621`, `dark622`, `dark623`, `dark624`, `dark625`, `dark626`, `dark627`, `dark628`, `dark629`, `dark630`, `dark631`, `dark632`, `dark633`, `dark634`, `dark635`, `dark636`, `dark637`, `dark638`, `dark639`, `dark640`, `dark641`, `dark642`, `dark643`, `dark644`, `dark645`, `dark646`, `dark647`, `dark648`, `dark649`, `dark650`, `dark651`, `dark652`, `dark653`, `dark654`, `dark655`, `dark656`, `dark657`, `dark658`, `dark659`, `dark660`, `dark661`, `dark662`, `dark663`, `dark664`, `dark665`, `dark666`, `dark667`, `dark668`, `dark669`, `dark670`, `dark671`, `dark672`, `dark673`, `dark674`, `dark675`, `dark676`, `dark677`, `dark678`, `dark679`, `dark680`, `dark681`, `dark682`, `dark683`, `dark684`, `dark685`, `dark686`, `dark687`, `dark688`, `dark689`, `dark690`, `dark691`, `dark692`, `dark693`, `dark694`, `dark695`, `dark696`, `dark697`, `dark698`, `dark699`, `dark700`, `dark701`, `dark702`, `dark703`, `dark704`, `dark705`, `dark706`, `dark707`, `dark708`, `dark709`, `dark710`, `dark711`, `dark712`, `dark713`, `dark714`, `dark715`, `dark716`, `dark717`, `dark718`, `dark719`, `dark720`, `dark721`, `dark722`, `dark723`, `dark724`, `dark725`, `dark726`, `dark727`, `dark728`, `dark729`, `dark730`, `dark731`, `dark732`, `dark733`, `dark734`, `dark735`, `dark736`, `dark737`, `dark738`, `dark739`, `dark740`, `dark741`, `dark742`, `dark743`, `dark744`, `dark745`, `dark746`, `dark747`, `dark748`, `dark749`, `dark750`, `dark751`, `dark752`, `dark753`, `dark754`, `dark755`, `dark756`, `dark757`, `dark758`, `dark759`, `dark760`, `dark761`, `dark762`, `dark763`, `dark764`, `dark765`, `dark766`, `dark767`, `dark768`, `dark769`, `dark770`, `dark771`, `dark772`, `dark773`, `dark774`, `dark775`, `dark776`, `dark777`, `dark778`, `dark779`, `dark780`, `dark781`, `dark782`, `dark783`, `dark784`, `dark785`, `dark786`, `dark787`, `dark788`, `dark789`, `dark790`, `dark791`, `dark792`, `dark793`, `dark794`, `dark795`, `dark796`, `dark797`, `dark798`, `dark799`, `dark800`, `dark801`, `dark802`, `dark803`, `dark804`, `dark805`, `dark806`, `dark807`, `dark808`, `dark809`, `dark810`, `dark811`, `dark812`, `dark813`, `dark814`, `dark815`, `dark816`, `dark817`, `dark818`, `dark819`, `dark820`, `dark821`, `dark822`, `dark823`, `dark824`, `dark825`, `dark826`, `dark827`, `dark828`, `dark829`, `dark830`, `dark831`, `dark832`, `dark833`, `dark834`, `dark835`, `dark836`, `dark837`, `dark838`, `dark839`, `dark840`, `dark841`, `dark842`, `dark843`, `dark844`, `dark845`, `dark846`, `dark847`, `dark848`, `dark849`, `dark850`, `dark851`, `dark852`, `dark853`, `dark854`, `dark855`, `dark856`, `dark857`, `dark858`, `dark859`, `dark860`, `dark861`, `dark862`, `dark863`, `dark864`, `dark865`, `dark866`, `dark867`, `dark868`, `dark869`, `dark870`, `dark871`, `dark872`, `dark873`, `dark874`, `dark875`, `dark876`, `dark877`, `dark878`, `dark879`, `dark880`, `dark881`, `dark882`, `dark883`, `dark884`, `dark885`, `dark886`, `dark887`, `dark888`, `dark889`, `dark890`, `dark891`, `dark892