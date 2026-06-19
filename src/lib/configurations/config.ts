const configurations = {
	nav: {
		texts: {
			title: 'ArdhiCorp',
			description: 'Fullstack Developer & Ai Engineer'
		},
		items: [
			{
				label: 'Home',
				icon: 'icon-roofing-outline',
				newPage: false,
				link: '/'
			},
			{
				label: 'Experience',
				icon: 'icon-work-outline',
				newPage: false,
				link: '/#experience'
			},
			{
				label: 'Portfolio',
				icon: 'icon-architecture-outline',
				newPage: false,
				link: '/#portfolio'
			},
			{
				label: 'Skill & Technology',
				icon: 'icon-psychology-outline',
				newPage: false,
				link: '/#skills'
			}
		]
	},
	footer: {
		quote: {
			text: 'Do so much work that it would be unreasonable for you not to be successful.',
			from: 'Alex Hormozi'
		},
		text: 'Built with graphite and code. ©',
		items: [
			{
				label: 'Privacy',
				link: '/privacy-policy'
			}
		]
	},
	seo: {
		home: {
			title: 'Ardhi Choiruddin',
			description:
				'I help businesses build high-quality websites and web applications that are fast, scalable, SEO-friendly, and easy to maintain, using a modern stack including Next.js, TypeScript, Fastify, and Payload CMS.',
			image: '/assets/images/ardhicorp-image-home.jpg'
		}
	}
};

export default configurations;
