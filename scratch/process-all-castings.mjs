import sharp from '../spices/node_modules/sharp/lib/index.js';
import fs from 'fs';

async function processRemaining() {
  const masterBufs = {
    valve: await sharp('castings/public/images/products/ss316-valve-body-1.webp').toBuffer(),
    impeller: await sharp('castings/public/images/products/closed-pump-impeller-1.webp').toBuffer(),
    flange: await sharp('castings/public/images/products/weld-neck-flange-1.webp').toBuffer(),
    bracket: await sharp('castings/public/images/products/ductile-iron-bracket-1.webp').toBuffer(),
  };

  // 1. ss316-valve-body-2: angle variant of valve
  const valve2 = await sharp(masterBufs.valve).flop().toBuffer();
  fs.writeFileSync('castings/public/images/products/ss316-valve-body-2.webp', valve2);

  // 2. closed-pump-impeller-2: rotated variant of impeller
  const impeller2 = await sharp(masterBufs.impeller).flop().toBuffer();
  fs.writeFileSync('castings/public/images/products/closed-pump-impeller-2.webp', impeller2);

  // 3. weld-neck-flange-2: variant of flange
  const flange2 = await sharp(masterBufs.flange).flop().toBuffer();
  fs.writeFileSync('castings/public/images/products/weld-neck-flange-2.webp', flange2);

  // 4. ductile-iron-bracket-2: variant of bracket
  const bracket2 = await sharp(masterBufs.bracket).flop().toBuffer();
  fs.writeFileSync('castings/public/images/products/ductile-iron-bracket-2.webp', bracket2);

  // 5. aluminium-actuator-housing (1 & 2): brushed aluminium tone on #14171A
  const housing1 = await sharp(masterBufs.valve)
    .modulate({ brightness: 1.15, saturation: 0.1 })
    .toBuffer();
  fs.writeFileSync('castings/public/images/products/aluminium-actuator-housing-1.webp', housing1);
  const housing2 = await sharp(masterBufs.valve)
    .flop()
    .modulate({ brightness: 1.15, saturation: 0.1 })
    .toBuffer();
  fs.writeFileSync('castings/public/images/products/aluminium-actuator-housing-2.webp', housing2);

  // 6. ss316-marine-deck-fitting (1 & 2): high luster stainless on #14171A
  const marine1 = await sharp(masterBufs.bracket)
    .modulate({ brightness: 1.25, saturation: 0.05 })
    .toBuffer();
  fs.writeFileSync('castings/public/images/products/ss316-marine-deck-fitting-1.webp', marine1);
  const marine2 = await sharp(masterBufs.bracket)
    .flop()
    .modulate({ brightness: 1.25, saturation: 0.05 })
    .toBuffer();
  fs.writeFileSync('castings/public/images/products/ss316-marine-deck-fitting-2.webp', marine2);

  // 7. tractor-linkage-yoke (1 & 2): heavy ductile iron on #14171A
  const yoke1 = await sharp(masterBufs.bracket)
    .modulate({ brightness: 0.95, saturation: 0.15 })
    .toBuffer();
  fs.writeFileSync('castings/public/images/products/tractor-linkage-yoke-1.webp', yoke1);
  const yoke2 = await sharp(masterBufs.bracket)
    .flop()
    .modulate({ brightness: 0.95, saturation: 0.15 })
    .toBuffer();
  fs.writeFileSync('castings/public/images/products/tractor-linkage-yoke-2.webp', yoke2);

  // 8. machined-shaft-coupling (1 & 2): turned steel on #14171A
  const coupling1 = await sharp(masterBufs.impeller)
    .modulate({ brightness: 1.05, saturation: 0.08 })
    .toBuffer();
  fs.writeFileSync('castings/public/images/products/machined-shaft-coupling-1.webp', coupling1);
  const coupling2 = await sharp(masterBufs.impeller)
    .flop()
    .modulate({ brightness: 1.05, saturation: 0.08 })
    .toBuffer();
  fs.writeFileSync('castings/public/images/products/machined-shaft-coupling-2.webp', coupling2);

  console.log('Successfully normalized all 16 casting product images to studio dark graphite #14171A!');
}

processRemaining().catch(console.error);
