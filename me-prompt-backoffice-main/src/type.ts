import type { IncomingMessage } from 'http';
import type { Env } from '@next/env';
import type { PreviewData } from 'next/types';

/**
 * Next `API` route request
 */

export declare type RequestQuery = Partial<{
    [key: string]: string | string[];
}>

export declare type NextApiRequest<QueryData = RequestQuery, BodyData = any> = IncomingMessage & {
    /**
     * Object of `query` values from url
     */
    query: QueryData;
    /**
     * Object of `cookies` from header
     */
    cookies: Partial<{
        [key: string]: string;
    }>;
    body: BodyData;
    env: Env;
    preview?: boolean;
    /**
     * Preview data set on the request, if any
     * */
    previewData?: PreviewData;
}
