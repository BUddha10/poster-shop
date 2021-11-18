new Vue({
	el: "#app",
	data: {
		total: 0,
		products: [],
		cart: [],
		search: "cat",
		lastSearch: "",
		loadingData: false,
	},
	methods: {
		addToCart: function (product) {
			this.total += product.price;
			let found = false;
			console.log(this.cart);
			for (var i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === product.id) {
					this.cart[i].qty++;
					found = true;
				}
			}
			if (!found) {
				this.cart.push({
					id: product.id,
					tital: product.tital,
					price: product.price,
					qty: 1,
				});
			}
		},
		addItm: function (item) {
			item.qty++;
			this.total += item.price;
		},
		remItm: function (item) {
			item.qty--;
			this.total -= item.price;
			if (item.qty <= 0) {
				var i = this.cart.indexOf(item);
				this.cart.splice(i, 1);
			}
		},
		onSubmit: function () {
			this.products = [];
			this.loadingData = true;
			const path = "/search?q=".concat(this.search);
			axios.get(path).then((response) => {
				this.products = { ...response.data };
				this.lastSearch = this.search;
				this.loadingData = false;
			});
		},
	},
	created: function () {
		this.onSubmit();
	},
	filters: {
		currency: function (price) {
			return "$".concat(price.toFixed(2));
		},
	},
});
