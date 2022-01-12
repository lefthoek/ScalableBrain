import { GraphQLResolveInfo } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare enum ProviderType {
    Slack = "SLACK"
}
export declare type Query = {
    team: Maybe<Team>;
};
export declare type QueryTeamArgs = {
    id: InputMaybe<Scalars['String']>;
};
export declare type Subscription = {
    addedTeams: Team;
    systemEvents: SystemEvent;
    updatedTeam: Team;
};
export declare type SubscriptionUpdatedTeamArgs = {
    team_id: Scalars['String'];
};
export declare type SystemEvent = {
    detail: Scalars['String'];
    detailType: Scalars['String'];
};
export declare type Team = {
    id: Scalars['String'];
    name: Scalars['String'];
    providers: Maybe<Array<TeamProvider>>;
};
export declare type TeamProvider = {
    access_token: Scalars['String'];
    id: Scalars['String'];
    name: Scalars['String'];
    type: ProviderType;
};
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    ProviderType: ProviderType;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Subscription: ResolverTypeWrapper<{}>;
    SystemEvent: ResolverTypeWrapper<SystemEvent>;
    Team: ResolverTypeWrapper<Team>;
    TeamProvider: ResolverTypeWrapper<TeamProvider>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Boolean: Scalars['Boolean'];
    Query: {};
    String: Scalars['String'];
    Subscription: {};
    SystemEvent: SystemEvent;
    Team: Team;
    TeamProvider: TeamProvider;
}>;
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    team: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<QueryTeamArgs, never>>;
}>;
export declare type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
    addedTeams: SubscriptionResolver<ResolversTypes['Team'], "addedTeams", ParentType, ContextType>;
    systemEvents: SubscriptionResolver<ResolversTypes['SystemEvent'], "systemEvents", ParentType, ContextType>;
    updatedTeam: SubscriptionResolver<ResolversTypes['Team'], "updatedTeam", ParentType, ContextType, RequireFields<SubscriptionUpdatedTeamArgs, 'team_id'>>;
}>;
export declare type SystemEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SystemEvent'] = ResolversParentTypes['SystemEvent']> = ResolversObject<{
    detail: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    detailType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = ResolversObject<{
    id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    providers: Resolver<Maybe<Array<ResolversTypes['TeamProvider']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type TeamProviderResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamProvider'] = ResolversParentTypes['TeamProvider']> = ResolversObject<{
    access_token: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    type: Resolver<ResolversTypes['ProviderType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type Resolvers<ContextType = any> = ResolversObject<{
    Query: QueryResolvers<ContextType>;
    Subscription: SubscriptionResolvers<ContextType>;
    SystemEvent: SystemEventResolvers<ContextType>;
    Team: TeamResolvers<ContextType>;
    TeamProvider: TeamProviderResolvers<ContextType>;
}>;
