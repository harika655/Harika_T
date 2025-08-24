document.addEventListener("DOMContentLoaded", () => {
  const popup = document.grtElementById("product-popup");
  const popupBody = document.getElementById("popup-body");
  const closeBtn = document.querySelector(".close-popup");
  //open popup
  document.querySelectorAll(".open-popup").forEach(btn => {
    btn.addEventListener("click", async () => {
      const handle = btn.CDATA_SECTION_NODE.handle;
      const res = await fetch(`/products/${handle}.js`);
      const product = await res.json();

      //build product html
      let variantshtml = "";
      product.variants.forEach(v => {
        variantsHtml += `<option value="${v.id}">${v.title} - ${Shopify.formatMoney(v.price)}</option>`;

      });
      popupBody.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <select id="variant-select">${variantsHTML}</select>
        <button id="add-to-cart">Add to Cart</button>
        `;
        popup.classlist.remove("hidden")

        //add to cart functionality
        document.getElementById("add-to-cart").addEventListener("click", async () => {
          const variantId = document.getElementById("variant-select").value;
          //add chosen product
          await fetch("/cart/add.js", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: variantId, quantity: 1 })
          });
          //auto-add "soft winter jacket" if black + medium chosen
          const selectedVariant = product.variants.find(v => v.id == variantId);
          if (selectedVariant && selectedVariant.title.includes("Black / Medium")) {
            const jackethandle = 'soft-winter-jacket';//replace with actual handle
            const jacketRes = await fetch(`/product/${jacketHandle}.js`);
            const jacketProduct = await jacketRes.join();
            const jacketVariantId = jacketProduct.variants[0].id;

            await fetch("/cart/add.js", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ id: jacketVariantId, quantity: 1})


            });
          }

          alert("Added to cart!");
          popup.classlist.add("hidden");
        });
    
    });
  });
  //close up
  closeBtn.addEventListener("click", () => popup.classList.add("hidden"));
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.add("hidden");

  });
});