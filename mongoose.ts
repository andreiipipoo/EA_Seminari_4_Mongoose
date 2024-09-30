import mongoose, { Schema, Document, connect } from 'mongoose';

// 1. Crear les interfícies TypeScript per a cada col·lecció
interface ILlibre extends Document {
  titol: string;
  autor: string;
  anyPublicacio: number;
  generes: string[];
  imatge?: string;
  biblioteca: mongoose.Schema.Types.ObjectId; // Referència a la biblioteca
}

interface IBiblioteca extends Document {
  nom: string;
  adreça: string;
  correu?: string;
}

// 2. Crear els esquemes corresponents a cada col·lecció
const llibreSchema = new Schema<ILlibre>({
  titol: { type: String, required: true },
  autor: { type: String, required: true },
  anyPublicacio: { type: Number, required: true },
  generes: { type: [String], required: true },
  imatge: String,
  biblioteca: { type: mongoose.Schema.Types.ObjectId, ref: 'Biblioteca', required: true } // Referència a la biblioteca
});

const bibliotecaSchema = new Schema<IBiblioteca>({
  nom: { type: String, required: true },
  adreça: { type: String, required: true },
  correu: String,
});

// 3. Crear models per a MongoDB utilitzant Mongoose i TypeScript
const Llibre = mongoose.model<ILlibre>('Llibre', llibreSchema);
const Biblioteca = mongoose.model<IBiblioteca>('Biblioteca', bibliotecaSchema);

async function run() {
  // 4. Connectar a la base de dades MongoDB
  await connect('mongodb://127.0.0.1:27017/test');

  //------------------------------ CREAR ------------------------------
  const biblioteca1 = new Biblioteca({
    nom: "Biblioteca Central",
    adreça: "Carrer de la Lectura 5",
    correu: "contacte@bibliotecacentral.com"
  });
  await biblioteca1.save();

  const llibre1 = new Llibre({
    titol: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anyPublicacio: 1967,
    generes: ["novel·la", "realisme màgic"],
    imatge: "https://exemple.com/cien_anyos.jpg",
    biblioteca: biblioteca1._id // Enllaçar el llibre amb la biblioteca
  });
  await llibre1.save();

  const llibre2 = new Llibre({
    titol: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    anyPublicacio: 1605,
    generes: ["novel·la", "aventura"],
    imatge: "https://exemple.com/don_quijote.jpg",
    biblioteca: biblioteca1._id // Enllaçar el llibre amb la biblioteca
  });
  await llibre2.save();

  //------------------------------ LLEGIR I POPULATE ------------------------------
  const llibres = await Llibre.find().populate<{ biblioteca: IBiblioteca }>('biblioteca').exec();
  llibres.forEach(llibre => {
    console.log(`El llibre "${llibre.titol}" pertany a la ${llibre.biblioteca.nom}`);
  });

  //------------------------------ AGGREGATION PIPELINE ------------------------------
  const llibresPerBiblioteca = await Llibre.aggregate([
    {
      $group: {
        _id: "$biblioteca",
        totalLlibres: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "bibliotecas", // Col·lecció de biblioteques
        localField: "_id",
        foreignField: "_id",
        as: "bibliotecaInfo"
      }
    }
  ]);

  llibresPerBiblioteca.forEach(result => {
    const bibliotecaNom = result.bibliotecaInfo[0]?.nom || "Desconeguda";
    console.log(`Biblioteca: ${bibliotecaNom}, Nombre de llibres: ${result.totalLlibres}`);
  });

  //------------------------------ ELIMINAR ------------------------------
  await Llibre.deleteOne({ titol: "Cien años de soledad" });

  //------------------------------ ACTUALITZAR ------------------------------
  const updateLlibre = await Llibre.findOneAndUpdate(
    { titol: "Don Quijote de la Mancha" },
    { biblioteca: biblioteca1._id }, // Actualitzar la biblioteca si cal
    { new: true }
  );
  console.log(`El llibre "${updateLlibre?.titol}" ara pertany a la biblioteca ${updateLlibre?.biblioteca}`);
}

run().catch(err => console.log(err));