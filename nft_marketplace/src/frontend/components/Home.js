import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from "react-bootstrap";

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (marketplace && nft) {
      loadAccount();
      loadMarketplaceItems();
    }
  }, [marketplace, nft]);
  

  // Load connected account
  const loadAccount = async () => {
    try {
      if (!window.ethereum) {
        console.error("MetaMask is not installed!");
        return;
      }
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" }); // Request wallet connection
      const signer = provider.getSigner();
      const account = await signer.getAddress();
  
      setAccount(account);
      console.log("Connected account:", account);
    } catch (error) {
      console.error("Error loading account:", error);
    }
  };
  
  const loadMarketplaceItems = async () => {
    try {
      if (!marketplace || !nft) {
        console.error("Marketplace or NFT contract is not defined.");
        return;
      }
  
      const itemCount = await marketplace.itemCount();
      console.log("Total Items:", itemCount.toString()); // Debugging log
  
      let items = [];
  
      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.items(i);
        
        if (item.tokenId.toNumber() === 0) continue;
  
        const uri = await nft.tokenURI(item.tokenId);
        console.log("Token URI:", uri); // Debugging log
  
        const response = await fetch(uri);
        if (!response.ok) {
          console.error("Error fetching metadata:", response.statusText);
          continue;
        }
  
        const metadata = await response.json();
        console.log("Metadata:", metadata); // Debugging log
  
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
  
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          owner: item.owner,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          sold: item.sold,
        });
      }
  
      console.log("Fetched Items:", items); // Debugging log
      setItems(items);
      setLoading(false); // ✅ Ensure loading state updates
    } catch (error) {
      console.error("Error loading marketplace items:", error);
    }
  };
  
  

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait();
    loadMarketplaceItems();
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="flex justify-center">
      {items.length > 0 ? (
        <div className="px-5 container">
          <h2 className="py-3">Listed NFTs</h2>
          <Row xs={1} md={2} lg={4} className="g-4">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    {item.sold ? (
                      <small className="text-muted">Sold</small>
                    ) : item.seller.toLowerCase() === account?.toLowerCase() ? (
                      <small className="text-muted">Listed by you</small>
                    ) : (
                      <div className="d-grid">
                        <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                          Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                        </Button>
                      </div>
                    )}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <h2>No listed assets</h2>
      )}
    </div>
  );
};

export default Home;
