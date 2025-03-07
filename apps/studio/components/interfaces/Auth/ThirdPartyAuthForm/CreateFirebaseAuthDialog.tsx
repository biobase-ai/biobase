import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Trash } from 'lucide-react'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { useParams } from 'common'
import { useCreateThirdPartyAuthIntegrationMutation } from 'data/third-party-auth/integration-create-mutation'
import { useFlag } from 'hooks/ui/useFlag'
import {
  AlertDescription_Shadcn_,
  AlertTitle_Shadcn_,
  Alert_Shadcn_,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  FormControl_Shadcn_,
  FormField_Shadcn_,
  Form_Shadcn_,
  Input_Shadcn_,
  Separator,
} from 'ui'
import { FormItemLayout } from 'ui-patterns/form/FormItemLayout/FormItemLayout'

interface CreateFirebaseAuthIntegrationProps {
  visible: boolean
  onClose: () => void
  // TODO: Remove this if this Dialog is only used for creating.
  onDelete: () => void
}

const FORM_ID = 'create-firebase-auth-integration-form'

const FormSchema = z.object({
  enabled: z.boolean(),
  firebaseProjectId: z
    .string()
    .trim()
    .min(1)
    .regex(/^[A-Za-z0-9-]+$/, 'The project ID contains invalid characters.'), // Only allow alphanumeric characters and hyphens.
})

export const CreateFirebaseAuthIntegrationDialog = ({
  visible,
  onClose,
  onDelete,
}: CreateFirebaseAuthIntegrationProps) => {
  // TODO: Remove this if this Dialog is only used for creating.
  const isCreating = true

  const { ref: projectRef } = useParams()
  const { mutate: createAuthIntegration, isLoading } = useCreateThirdPartyAuthIntegrationMutation({
    onSuccess: () => {
      toast.success(`Successfully created a new Firebase Auth integration.`)
      onClose()
    },
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      enabled: true,
      firebaseProjectId: '',
    },
  })

  const allowedProjectIDs = useFlag<string | null | undefined>('firebaseTPAAllowedProjectIDs')

  const isAvailable =
    typeof allowedProjectIDs === 'string'
      ? allowedProjectIDs.split(',').includes(projectRef!)
      : !!allowedProjectIDs

  useEffect(() => {
    if (visible) {
      form.reset({
        enabled: true,
        firebaseProjectId: '',
      })
      // the form input doesn't exist when the form is reset
      setTimeout(() => {
        form.setFocus('firebaseProjectId')
      }, 25)
    }
  }, [visible])

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (values) => {
    createAuthIntegration({
      projectRef: projectRef!,
      oidcIssuerUrl: `https://securetoken.google.com/${values.firebaseProjectId}`,
    })
  }

  return (
    <Dialog open={visible} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="truncate">
            {isCreating
              ? `Add new Firebase Auth connection`
              : `Update existing Firebase Auth connection`}
          </DialogTitle>
        </DialogHeader>

        <Separator />
        <DialogSection>
          {isAvailable ? (
            <Form_Shadcn_ {...form}>
              <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Enabled flag can't be changed for now because there's no update API call for integrations */}
                {/* <FormField_Shadcn_
              key="enabled"
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItemLayout
                  className="px-8"
                  label={`Enable Firebase Auth Connection`}
                  layout="flex"
                >
                  <FormControl_Shadcn_>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={field.disabled}
                    />
                  </FormControl_Shadcn_>
                </FormItemLayout>
              )}
            />
            <Separator /> */}

                <p className="text-sm text-foreground-light">
                  This will enable a JWT token from a specific Firebase project to access data from
                  this Biobase project.
                </p>
                <FormField_Shadcn_
                  key="firebaseProjectId"
                  control={form.control}
                  name="firebaseProjectId"
                  render={({ field }) => (
                    <FormItemLayout label="Firebase Auth Project ID">
                      <FormControl_Shadcn_>
                        <Input_Shadcn_ {...field} />
                      </FormControl_Shadcn_>
                    </FormItemLayout>
                  )}
                />

                <Alert_Shadcn_ variant="warning">
                  <AlertTriangle strokeWidth={2} />
                  <AlertTitle_Shadcn_>
                    This connection requires a Row Level Security (RLS) policy
                  </AlertTitle_Shadcn_>
                  <AlertDescription_Shadcn_>
                    You will need to manually add a RLS policy after creating this Firebase
                    connection. Otherwise, the Biobase project will be accessible to anyone with a
                    valid Firebase JWT token.
                  </AlertDescription_Shadcn_>
                </Alert_Shadcn_>
              </form>
            </Form_Shadcn_>
          ) : (
            <p className="text-sm text-foreground-light pb-2">
              Third-party Auth with Firebase is currently in a private alpha release.{' '}
              <a
                className="underline"
                href="https://forms.biobase.studio/third-party-auth-with-firebase"
                target="_blank"
              >
                Please submit your interest for it
              </a>{' '}
              and someone from the Biobase team will reach out. You can also try it out via the
              CLI.
            </p>
          )}
        </DialogSection>
        <DialogFooter>
          {isAvailable ? (
            <>
              {!isCreating && (
                <div className="flex-1">
                  <Button type="danger" onClick={() => onDelete()} icon={<Trash />}>
                    Remove connection
                  </Button>
                </div>
              )}

              <Button disabled={isLoading} type="default" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button form={FORM_ID} htmlType="submit" disabled={isLoading} loading={isLoading}>
                {isCreating ? 'Create connection' : 'Update connection'}
              </Button>
            </>
          ) : (
            <>
              <Button disabled={isLoading} type="default" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button onClick={() => onClose()} asChild>
                <a href="https://forms.biobase.studio/third-party-auth-with-firebase" target="_blank">
                  Register interest
                </a>
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
