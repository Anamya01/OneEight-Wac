const cors = require('cors');

const express = require("express");
const stripe = require('stripe')('sk_test_51OXgLWSBnGr0bdLqCubfBoAqk1x9K3DupXQ1siSY452MhJfIm3Kut3GUIjV2ZWxCEWWgZ9euHYlt4xKjYbJC0Prj00ljMAlCaB');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.post("/api/create-checkout-session",async(req,res)=>{
  const {products} = req.body;
  const lineItems = products.map((product)=>({
    price_data:{
        currency:"inr",
        product_data:{
            name:product.name,
        },
        unit_amount:product.price * 100,
    },
    quantity:1
}));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items:lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({id:session.id})

  console.log(products);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//4000003560000008