const { gql } = require("apollo-server-express");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Files = require("../models/Files");

const files = [];

async function saveFileInDB(fileName) {
  const file = new Files({
    name: fileName,
    url: `https://storage.cloud.google.com/codettes/${fileName}`,
  });

  const res = await file.save();
  console.log(res);
}

const typeDefs = gql`
  type Query {
    files: [String]
  }

  type Mutation {
    uploadFile(file: Upload!): Boolean
  }
`;

const gc = new Storage({
  keyFilename: path.join(__dirname, "../config/MapOne-f30446a41ac0.json"),
  projectId: "mapone-1530798541007",
});

const coolFilesBucket = gc.bucket("codettes");

const resolvers = {
  Query: {
    files: () => files,
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename } = await file;

      await new Promise((res) =>
        createReadStream()
          .pipe(
            coolFilesBucket.file(filename).createWriteStream({
              resumable: false,
              gzip: true,
            })
          )
          .on("finish", res)
      );

      files.push(filename);

      await saveFileInDB(filename);

      return true;
    },
  },
};

module.exports = { typeDefs, resolvers };
