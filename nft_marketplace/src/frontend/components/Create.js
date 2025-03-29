import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'  // ✅ Import axios for API requests

const PINATA_API_KEY = "ca6f527e731b295e1288";
const PINATA_SECRET_API_KEY = "1cea24fd0a03b66cb2fb173abc774d69bc53b679ce064b816d6aa7dc6138218e";
const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmY2JiZWFlNC1hMzc1LTQzMTQtOTgzYi03ZTVmMDdkYjJhMjAiLCJlbWFpbCI6ImRpd2FzbWlzaHJhMTUzOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiY2E2ZjUyN2U3MzFiMjk1ZTEyODgiLCJzY29wZWRLZXlTZWNyZXQiOiIxY2VhMjRmZDBhMDNiNjZjYjJmYjE3M2FiYzc3NGQ2OWJjNTNiNjc5Y2UwNjRiODE2ZDZhYTdkYzYxMzgyMThlIiwiZXhwIjoxNzcxNDI0MzQyfQ.0ewnRZ3V1r7xepmhDM5UpRt0bHYuplGKk8TBYQpy4Ik"; // Optional if using JWT auth

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Upload file to Pinata IPFS
  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
  
    if (!file) return alert("Please select a file!");
  
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
  
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "pinata_api_key": PINATA_API_KEY,
            "pinata_secret_api_key": PINATA_SECRET_API_KEY
          }
        }
      );
  
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      setImage(ipfsUrl);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("IPFS Upload Error:", error);
      alert("File upload failed. Please try again.");
    }
  };
  

  // Upload NFT metadata to Pinata
  const createNFT = async () => {
    if (!image || !price || !name || !description) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const metadata = {
        name,
        description,
        image,
        price
      };

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            "Content-Type": "application/json",
            "pinata_api_key": PINATA_API_KEY,
            "pinata_secret_api_key": PINATA_SECRET_API_KEY
          }
        }
      );

      const metadataUri = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      console.log("NFT Metadata uploaded:", metadataUri);
      mintThenList(metadataUri);
    } catch (error) {
      console.error("IPFS metadata upload error: ", error);
    }
  };

  // Mint and List NFT
  const mintThenList = async (metadataUri) => {
    try {
      // Mint NFT
      const mintTx = await nft.mint(metadataUri);
      await mintTx.wait();
      const id = await nft.tokenCount();

      // Approve Marketplace
      const approveTx = await nft.setApprovalForAll(marketplace.address, true);
      await approveTx.wait();

      // List NFT on Marketplace
      const listingPrice = ethers.utils.parseEther(price.toString());
      const listTx = await marketplace.makeItem(nft.address, id, listingPrice);
      await listTx.wait();

      console.log("NFT Minted & Listed Successfully!");
    } catch (error) {
      console.error("Error minting/listing NFT:", error);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control type="file" required name="file" onChange={uploadToIPFS} />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;