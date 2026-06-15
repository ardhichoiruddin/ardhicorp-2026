import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type ContactDocumentDataSlicesSlice = never

/**
 * Content for Contact documents
 */
interface ContactDocumentData {
	/**
	 * Title field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Sub Title field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.sub_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sub_title: prismic.KeyTextField;
	
	/**
	 * Slice Zone field in *Contact*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<ContactDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: contact.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: contact.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Contact*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Contact document from Prismic
 *
 * - **API ID**: `contact`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContactDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ContactDocumentData>, "contact", Lang>;

type HomeDocumentDataSlicesSlice = HeroSectionSlice | GithubCalenderContributionsSlice | ExperienceSlice | PortfolioSlice | SkillsSlice

/**
 * Content for Home documents
 */
interface HomeDocumentData {
	/**
	 * Slice Zone field in *Home*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomeDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Home*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: home.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Home*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: home.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Home*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;

/**
 * Item in *Portfolio → Tech Stacks*
 */
export interface PortfolioDocumentDataTechStacksItem {
	/**
	 * Name field in *Portfolio → Tech Stacks*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.tech_stacks[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
}

type PortfolioDocumentDataSlicesSlice = never

/**
 * Content for Portfolio documents
 */
interface PortfolioDocumentData {
	/**
	 * Image field in *Portfolio*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Title field in *Portfolio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Decription field in *Portfolio*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.decription
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	decription: prismic.RichTextField;
	
	/**
	 * Short Description field in *Portfolio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.short_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	short_description: prismic.KeyTextField;
	
	/**
	 * Link field in *Portfolio*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Project Now field in *Portfolio*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.project_now
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	project_now: prismic.SelectField<"Not Started" | "Live" | "Building">;
	
	/**
	 * Tech Stacks field in *Portfolio*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.tech_stacks[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	tech_stacks: prismic.GroupField<Simplify<PortfolioDocumentDataTechStacksItem>>;
	
	/**
	 * Slice Zone field in *Portfolio*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PortfolioDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Portfolio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: portfolio.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Portfolio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: portfolio.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Portfolio*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Portfolio document from Prismic
 *
 * - **API ID**: `portfolio`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PortfolioDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PortfolioDocumentData>, "portfolio", Lang>;

type PrivacyPolicyDocumentDataSlicesSlice = never

/**
 * Content for Privacy & Policy documents
 */
interface PrivacyPolicyDocumentData {
	/**
	 * Title field in *Privacy & Policy*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Content field in *Privacy & Policy*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy.content
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
	
	/**
	 * Slice Zone field in *Privacy & Policy*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PrivacyPolicyDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Privacy & Policy*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: privacy_policy.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Privacy & Policy*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: privacy_policy.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Privacy & Policy*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Privacy & Policy document from Prismic
 *
 * - **API ID**: `privacy_policy`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PrivacyPolicyDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<PrivacyPolicyDocumentData>, "privacy_policy", Lang>;

export type AllDocumentTypes = ContactDocument | HomeDocument | PortfolioDocument | PrivacyPolicyDocument;

/**
 * Item in *Experience → Default → Primary → Card*
 */
export interface ExperienceSliceDefaultPrimaryCardsItem {
	/**
	 * Company Name field in *Experience → Default → Primary → Card*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience.default.primary.cards[].company_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	company_name: prismic.KeyTextField;
	
	/**
	 * Title field in *Experience → Default → Primary → Card*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience.default.primary.cards[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * From field in *Experience → Default → Primary → Card*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience.default.primary.cards[].from
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	from: prismic.DateField;
	
	/**
	 * To field in *Experience → Default → Primary → Card*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience.default.primary.cards[].to
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	to: prismic.DateField;
	
	/**
	 * Present field in *Experience → Default → Primary → Card*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: experience.default.primary.cards[].present
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	present: prismic.BooleanField;
	
	/**
	 * Place field in *Experience → Default → Primary → Card*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience.default.primary.cards[].place
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	place: prismic.SelectField<"Remote" | "On Site">;
}

/**
 * Primary content in *Experience → Default → Primary*
 */
export interface ExperienceSliceDefaultPrimary {
	/**
	 * Title field in *Experience → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Card field in *Experience → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience.default.primary.cards[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	cards: prismic.GroupField<Simplify<ExperienceSliceDefaultPrimaryCardsItem>>;
}

/**
 * Default variation for Experience Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ExperienceSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ExperienceSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Experience*
 */
type ExperienceSliceVariation = ExperienceSliceDefault

/**
 * Experience Shared Slice
 *
 * - **API ID**: `experience`
 * - **Description**: Experience
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ExperienceSlice = prismic.SharedSlice<"experience", ExperienceSliceVariation>;

/**
 * Primary content in *GithubCalenderContributions → Default → Primary*
 */
export interface GithubCalenderContributionsSliceDefaultPrimary {
	/**
	 * Title field in *GithubCalenderContributions → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: github_calender_contributions.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Github Username field in *GithubCalenderContributions → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: github_calender_contributions.default.primary.github_username
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	github_username: prismic.KeyTextField;
}

/**
 * Default variation for GithubCalenderContributions Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GithubCalenderContributionsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<GithubCalenderContributionsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *GithubCalenderContributions*
 */
type GithubCalenderContributionsSliceVariation = GithubCalenderContributionsSliceDefault

/**
 * GithubCalenderContributions Shared Slice
 *
 * - **API ID**: `github_calender_contributions`
 * - **Description**: GithubCalenderContributions
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GithubCalenderContributionsSlice = prismic.SharedSlice<"github_calender_contributions", GithubCalenderContributionsSliceVariation>;

/**
 * Item in *HeroSection → Default → Primary → Primary Button*
 */
export interface HeroSectionSliceDefaultPrimaryPrimaryButtonItem {
	/**
	 * Label field in *HeroSection → Default → Primary → Primary Button*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.primary_button[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Link field in *HeroSection → Default → Primary → Primary Button*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.primary_button[].link
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	link: prismic.KeyTextField;
	
	/**
	 * New Page field in *HeroSection → Default → Primary → Primary Button*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: hero_section.default.primary.primary_button[].new_page
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	new_page: prismic.BooleanField;
	
	/**
	 * Type field in *HeroSection → Default → Primary → Primary Button*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.primary_button[].type
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	type: prismic.SelectField<"link" | "email">;
}

/**
 * Item in *HeroSection → Default → Primary → Secondary Button*
 */
export interface HeroSectionSliceDefaultPrimarySecondaryButtonItem {
	/**
	 * Label field in *HeroSection → Default → Primary → Secondary Button*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.secondary_button[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Link field in *HeroSection → Default → Primary → Secondary Button*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.secondary_button[].link
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	link: prismic.KeyTextField;
	
	/**
	 * New Page field in *HeroSection → Default → Primary → Secondary Button*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: hero_section.default.primary.secondary_button[].new_page
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	new_page: prismic.BooleanField;
	
	/**
	 * Type field in *HeroSection → Default → Primary → Secondary Button*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.secondary_button[].type
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	type: prismic.SelectField<"link" | "email">;
}

/**
 * Item in *HeroSection → Default → Primary → Social Media*
 */
export interface HeroSectionSliceDefaultPrimarySocialMediaItem {
	/**
	 * Label field in *HeroSection → Default → Primary → Social Media*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.social_media[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Link field in *HeroSection → Default → Primary → Social Media*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.social_media[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * New Page field in *HeroSection → Default → Primary → Social Media*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: hero_section.default.primary.social_media[].new_page
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	new_page: prismic.BooleanField;
}

/**
 * Primary content in *HeroSection → Default → Primary*
 */
export interface HeroSectionSliceDefaultPrimary {
	/**
	 * Photo Profile field in *HeroSection → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.photo_profile
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo_profile: prismic.ImageField<never>;
	
	/**
	 * Name field in *HeroSection → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: write your name
	 * - **API ID Path**: hero_section.default.primary.name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Title field in *HeroSection → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Write your title
	 * - **API ID Path**: hero_section.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Sort Introducing field in *HeroSection → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.sort_introducing
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sort_introducing: prismic.KeyTextField;
	
	/**
	 * Primary Button field in *HeroSection → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.primary_button[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	primary_button: prismic.GroupField<Simplify<HeroSectionSliceDefaultPrimaryPrimaryButtonItem>>;
	
	/**
	 * Secondary Button field in *HeroSection → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.secondary_button[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	secondary_button: prismic.GroupField<Simplify<HeroSectionSliceDefaultPrimarySecondaryButtonItem>>;
	
	/**
	 * Social Media field in *HeroSection → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_section.default.primary.social_media[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	social_media: prismic.GroupField<Simplify<HeroSectionSliceDefaultPrimarySocialMediaItem>>;
}

/**
 * Default variation for HeroSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSectionSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSectionSliceDefaultPrimary>, never>;

/**
 * Slice variation for *HeroSection*
 */
type HeroSectionSliceVariation = HeroSectionSliceDefault

/**
 * HeroSection Shared Slice
 *
 * - **API ID**: `hero_section`
 * - **Description**: HeroSection
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSectionSlice = prismic.SharedSlice<"hero_section", HeroSectionSliceVariation>;

/**
 * Item in *Portfolio → Default → Primary → Portfolio*
 */
export interface PortfolioSliceDefaultPrimaryPortfolioItem {
	/**
	 * Product Link field in *Portfolio → Default → Primary → Portfolio*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.default.primary.portfolio[].product_link
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	product_link: ContentRelationshipFieldWithData<[{"id":"portfolio","fields":["image","title","project_now","short_description"]}]>;
}

/**
 * Primary content in *Portfolio → Default → Primary*
 */
export interface PortfolioSliceDefaultPrimary {
	/**
	 * Title field in *Portfolio → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Portfolio field in *Portfolio → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.default.primary.portfolio[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	portfolio: prismic.GroupField<Simplify<PortfolioSliceDefaultPrimaryPortfolioItem>>;
}

/**
 * Default variation for Portfolio Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PortfolioSliceDefault = prismic.SharedSliceVariation<"default", Simplify<PortfolioSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Portfolio*
 */
type PortfolioSliceVariation = PortfolioSliceDefault

/**
 * Portfolio Shared Slice
 *
 * - **API ID**: `portfolio`
 * - **Description**: Portfolio
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PortfolioSlice = prismic.SharedSlice<"portfolio", PortfolioSliceVariation>;

/**
 * Item in *Skills → Default → Primary → Skills*
 */
export interface SkillsSliceDefaultPrimarySkillsItem {
	/**
	 * Name field in *Skills → Default → Primary → Skills*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skills.default.primary.skills[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
}

/**
 * Primary content in *Skills → Default → Primary*
 */
export interface SkillsSliceDefaultPrimary {
	/**
	 * Title field in *Skills → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skills.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Skills field in *Skills → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skills.default.primary.skills[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	skills: prismic.GroupField<Simplify<SkillsSliceDefaultPrimarySkillsItem>>;
}

/**
 * Default variation for Skills Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type SkillsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<SkillsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Skills*
 */
type SkillsSliceVariation = SkillsSliceDefault

/**
 * Skills Shared Slice
 *
 * - **API ID**: `skills`
 * - **Description**: Skills
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type SkillsSlice = prismic.SharedSlice<"skills", SkillsSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			ContactDocument,
			ContactDocumentData,
			ContactDocumentDataSlicesSlice,
			HomeDocument,
			HomeDocumentData,
			HomeDocumentDataSlicesSlice,
			PortfolioDocument,
			PortfolioDocumentData,
			PortfolioDocumentDataTechStacksItem,
			PortfolioDocumentDataSlicesSlice,
			PrivacyPolicyDocument,
			PrivacyPolicyDocumentData,
			PrivacyPolicyDocumentDataSlicesSlice,
			AllDocumentTypes,
			ExperienceSlice,
			ExperienceSliceDefaultPrimaryCardsItem,
			ExperienceSliceDefaultPrimary,
			ExperienceSliceVariation,
			ExperienceSliceDefault,
			GithubCalenderContributionsSlice,
			GithubCalenderContributionsSliceDefaultPrimary,
			GithubCalenderContributionsSliceVariation,
			GithubCalenderContributionsSliceDefault,
			HeroSectionSlice,
			HeroSectionSliceDefaultPrimaryPrimaryButtonItem,
			HeroSectionSliceDefaultPrimarySecondaryButtonItem,
			HeroSectionSliceDefaultPrimarySocialMediaItem,
			HeroSectionSliceDefaultPrimary,
			HeroSectionSliceVariation,
			HeroSectionSliceDefault,
			PortfolioSlice,
			PortfolioSliceDefaultPrimaryPortfolioItem,
			PortfolioSliceDefaultPrimary,
			PortfolioSliceVariation,
			PortfolioSliceDefault,
			SkillsSlice,
			SkillsSliceDefaultPrimarySkillsItem,
			SkillsSliceDefaultPrimary,
			SkillsSliceVariation,
			SkillsSliceDefault
		}
	}
}